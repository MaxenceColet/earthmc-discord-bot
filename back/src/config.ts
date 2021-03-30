import {merge} from 'lodash';

const defaultConfig = {
  application: {
    port: 3584,
  },
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
    },
  },
};

export const config: typeof defaultConfig = merge(defaultConfig, require('../config'));
