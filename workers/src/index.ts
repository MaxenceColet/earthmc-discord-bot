import {mongo} from './helpers/mongo.helper';
import {jobLoop, startAll} from './jobs';

export const init = async () => {
  console.log('Connecting to MongoDB...');
  await mongo.connect();
  console.log('Connected to MongoDB');
  if (process.env.NODE_ENV === 'dev') {
    console.log('Starting a specific command');
  } else {
    console.log('Starting every job loop...');
    startAll();
    console.log('Done!');
  }
};

init().then(() => jobLoop.start());
