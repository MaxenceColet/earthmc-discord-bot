import {mongo} from './db';
import * as discordBot from './bot';

const init = async () => {
  await mongo.connect();
  await discordBot.init();

  // test command
  discordBot.saveNearest();
};

init();
