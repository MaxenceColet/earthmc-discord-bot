import {config} from '../config';
import {mongo} from '../db';
import {HomelessPlayer} from '../player.interface';
import {getPingTime} from '../emcBot';

export const getActiveHomeless = async () => {
  const allPlayers = mongo.find<HomelessPlayer>(config.mongo.collections.players, {
    town: {$eq: undefined},
    pingTime: {
      $gte: getPingTime(),
    },
  });
  return allPlayers;
};

export const getActiveStrangers = async () => {
  const allPlayers = mongo.find<HomelessPlayer>(config.mongo.collections.players, {
    town: {$ne: undefined},
    pingTime: {
      $gte: getPingTime(),
    },
  });
  return allPlayers;
};
