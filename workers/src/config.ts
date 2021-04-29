import {merge} from 'lodash';

const defaultConfig = {
  threshold: 2000,
  townCoordinates: {
    x: 0,
    y: 0,
    z: 0,
  },
  botLogin: '',
  cacheToken: '',
  mongo: {
    host: '',
    port: 27017,
    auth: {
      user: '',
      password: '',
    },
    database: '',
    collections: {
      players: 'players',
      beacons: 'beacons',
    },
  },
};

export const config: typeof defaultConfig = merge(defaultConfig, require('../config'));
