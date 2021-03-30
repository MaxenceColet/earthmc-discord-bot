import {config} from '../config';
import {mongo} from '../db';
import {HomelessPlayer, StrangerPlayer} from '../player.interface';
import {getPingTime} from '../emcBot';
import {calcDbDistance} from '../helpers/math';

export const getActiveHomeless = async (): Promise<Array<HomelessPlayer & {distance: number}>> => {
  const allPlayers = await mongo.find<HomelessPlayer>(config.mongo.collections.players, {
    town: {$eq: undefined},
    pingTime: {
      $gte: getPingTime(),
    },
  });
  return allPlayers.map(p => ({...p, distance: calcDbDistance(config.townCoordinates, p)}));
};

export const getActiveStrangers = async () => {
  const allPlayers = await mongo.find<StrangerPlayer>(config.mongo.collections.players, {
    town: {$ne: undefined},
    pingTime: {
      $gte: getPingTime(),
    },
  });
  return allPlayers.map(p => ({...p, distance: calcDbDistance(config.townCoordinates, p)}));
};

export const getHistory = async () => {};
