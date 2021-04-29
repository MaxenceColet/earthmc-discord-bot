import {config} from '../config';
import * as emc from './emc.controller';
import {mongo} from '../helpers/mongo';
import {EmcPlayer, HomelessPlayer, StrangerPlayer} from '../interfaces/player.interface';
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

export const getHistory = async () => {
  const allPlayers = await mongo.find<StrangerPlayer>(config.mongo.collections.players, {
    pingTime: {
      $lte: getPingTime(),
    },
  });
  return allPlayers.map(p => ({...p, distance: calcDbDistance(config.townCoordinates, p)}));
};

export const getTownInhabitants = async (townName: string) => {
  const allPlayers = await emc.getAllPlayers();
  return allPlayers.filter(p => p.town === townName);
};

export const getConnectedTownInhabitants = async (townName: string): Promise<Array<EmcPlayer>> => {
  return (await getTownInhabitants(townName)).filter(p => p.x != null);
};
