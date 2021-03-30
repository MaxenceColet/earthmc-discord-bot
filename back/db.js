const mongo = require("mongodb");
const {inspect} = require('util')

const generateConnectionUrl = (options) =>
  `mongodb://${options.auth.user}:${encodeURIComponent(
    options.auth.password
  )}@${options.host}:${options.port}`;

const conf = require("./config.json").mongo;

class MongoClient {
  constructor() {
    this.sessionPromise = mongo.connect(generateConnectionUrl(conf), {
      useUnifiedTopology: true,
    });
  }

  async connect() {
    this.session = await this.sessionPromise;
    this.db = this.session.db("earthmc");
  }

  async insertMany(collection, data) {
    if (!data?.length) {
      return;
    }
    return this.db
      .collection(collection)
      .insertMany(data.map((d) => ({ ...d, createdAt: new Date() })));
  }

  async insertOne(collection, data) {
    return this.db
      .collection(collection)
      .insertOne({ ...data, createdAt: new Date() });
  }

  async deleteMany(collection) {
    return this.db
      .collection(collection)
      .deleteMany({});
  }

  async findOne(collection, filter) {
    return this.db.collection(collection).findOne(filter ?? {});
  }

  async find(collection, filter) {
    console.log(`find filters ${inspect(filter)}`)
    return this.db.collection(collection).find(filter ?? {}).toArray();
  }

  async updateMany(collection, filter, update) {
    return this.db.collection(collection).updateMany(filter, update)
  }

  async updateOne(collection, filter, update) {
    return this.db.collection(collection).updateOne(filter, update)
  }
}

module.exports = new MongoClient();
