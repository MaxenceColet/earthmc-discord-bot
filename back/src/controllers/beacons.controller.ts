import {config} from '../config';
import {mongo} from '../db';
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
