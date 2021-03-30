import {mongo} from './helpers/mongo.helper';
import {initPlayerBeaconJobs, initTownBeaconJobs} from './jobs';

export const init = async () => {
  console.log('Connecting to MongoDB...');
  await mongo.connect();
  console.log('Connected to MongoDB');
  if (process.env.NODE_ENV === 'dev') {
    console.log('Starting a specific command');
    initTownBeaconJobs();
    initPlayerBeaconJobs();
  } else {
    console.log('Starting every job loop...');
    initTownBeaconJobs();
    initPlayerBeaconJobs();
    console.log('Done!');
  }
};

init();
