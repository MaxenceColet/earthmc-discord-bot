const mongoClient = require("./db");
const discordBot = require("./bot");
const config = require("./config.json");

const init = async () => {
  await mongoClient.connect();
  await discordBot.init();

  // test command
  discordBot.saveNearest();
};

init();
