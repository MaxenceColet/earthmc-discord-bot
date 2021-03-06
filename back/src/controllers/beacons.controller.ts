import {config} from '../config';
import {mongo} from '../helpers/mongo';
import {Beacon} from '../interfaces/beacons.interface';

export const activateBeacon = async (playerName: string) => {
  await mongo.upsert<Beacon>(
    config.mongo.collections.beacons,
    {
      playerName,
    },
    {
      active: true,
      lastRun: new Date(),
      playerName,
      playersInRange: [],
    },
  );
};
export const deactivateBeacon = async (playerName: string) => {
  await mongo.upsert<Beacon>(
    config.mongo.collections.beacons,
    {
      playerName,
    },
    {
      active: false,
      lastRun: new Date(),
      playerName,
      playersInRange: [],
    },
  );
};

export const getProximity = async (playerName: string) => {
  return mongo.findOne<Beacon>(config.mongo.collections.beacons, {playerName});
};
