import {merge} from 'lodash';

const defaultConfig = {
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
  },
};


export const config: typeof defaultConfig = merge(defaultConfig, require('../config'));
