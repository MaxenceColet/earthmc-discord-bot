import {mongo} from './helpers/mongo.helper';
import {initTownBeaconJobs} from './jobs';

export const init = async () => {
  console.log('Connecting to MongoDB...');
  await mongo.connect();
  console.log('Connected to MongoDB');
  if (process.env.NODE_ENV === 'dev') {
    console.log('Starting a specific command');
    initTownBeaconJobs();
  } else {
    console.log('Starting every job loop...');
    initTownBeaconJobs();
    console.log('Done!');
  }
};

init()
