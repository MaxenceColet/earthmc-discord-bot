import * as mongodb from 'mongodb';
import {config} from './config';

const generateConnectionUrl = (options: typeof config.mongo) =>
  `mongodb://${options.auth.user}:${encodeURIComponent(options.auth.password)}@${options.host}:${options.port}`;

class MongoClient {
  sessionPromise: Promise<mongodb.MongoClient>;
  session!: mongodb.MongoClient;
  db!: mongodb.Db;

  constructor(url: string, options: mongodb.MongoClientOptions = {}) {
    this.sessionPromise = mongodb.connect(url, {
      ...options,
      useUnifiedTopology: true,
    });
  }

  async connect() {
    this.session = await this.sessionPromise;
    this.db = this.session.db(config.mongo.database);
  }

  async findOne<T>(
    collection: string,
    filter: mongodb.FilterQuery<Partial<T>>,
    options: mongodb.FindOneOptions<any> = {},
  ): Promise<T | null> {
    return this.db.collection(collection).findOne<T>({...filter, deletedAt: null}, options);
  }

  async find<T>(
    collection: string,
    filter: mongodb.FilterQuery<Partial<T>>,
    options: {sort?: any; limit?: number; project?: {[key in keyof T]?: number}} = {},
  ): Promise<Array<T>> {
    (filter as any).deletedAt = null;
    const cursor = this.db.collection(collection).find(filter);
    if (options.sort) {
      cursor.sort(options.sort);
    }
    if (options.limit) {
      cursor.limit(options.limit);
    }
    if (options.project) {
      cursor.project(options.project);
    }
    return cursor.toArray() as Promise<Array<T>>;
  }

  async aggregate<T>(collection: string, pipeline: Array<any>): Promise<Array<T>> {
    return this.db.collection(collection).aggregate<T>(pipeline).toArray();
  }

  async insertOne<T>(collection: string, data: T): Promise<T> {
    const insertionResult = await this.db.collection(collection).insertOne(document);
    return {
      ...data,
      _id: insertionResult.insertedId,
    } as T;
  }

  async insertMany<T>(collection: string, data: Array<T>): Promise<Array<T>> {
    const insertionResult = await this.db.collection(collection).insertMany(data);
    const insertedId = Object.keys(insertionResult.insertedIds).map(
      (k: any) => insertionResult.insertedIds[k] as mongodb.ObjectId,
    );
    return data.map((document, idx) => ({
      _id: insertedId[idx],
      ...document,
    })) as Array<T>;
  }

  async updateOne<T>(
    collection: string,
    filter: mongodb.FilterQuery<T>,
    update: mongodb.UpdateQuery<T>,
  ): Promise<mongodb.UpdateWriteOpResult> {
    update.$set = update.$set ?? {};
    Object.assign(update.$set, {updatedAt: new Date()});
    return this.db.collection(collection).updateOne(filter, update);
  }

  async updateMany<T>(
    collection: string,
    filter: mongodb.FilterQuery<T>,
    update: mongodb.UpdateQuery<T>,
  ): Promise<mongodb.UpdateWriteOpResult> {
    update.$set = update.$set ?? {};
    Object.assign(update.$set, {updatedAt: new Date()});
    return this.db.collection(collection).updateMany(filter, update);
  }

  async deleteOne<T>(collection: string, filter: mongodb.FilterQuery<T>) {
    return this.db.collection(collection).deleteOne(filter);
  }

  async deleteMany<T>(collection: string, filter: mongodb.FilterQuery<T>) {
    return this.db.collection(collection).deleteMany(filter);
  }

  async upsert<T>(collection: string, filter: mongodb.FilterQuery<T>, data: T) {
    const d = new Date();
    Object.assign(data, {createdAt: d, updatedAt: d});
    return this.db.collection(collection).updateOne(filter, {$set: data}, {upsert: true});
  }

  async dropCollection(collection: string): Promise<void> {
    try {
      await this.db.dropCollection(collection);
    } catch (err) {
      if (err.message !== 'ns not found') {
        throw err;
      }
    }
  }
}

export const mongo = new MongoClient(generateConnectionUrl(config.mongo));
