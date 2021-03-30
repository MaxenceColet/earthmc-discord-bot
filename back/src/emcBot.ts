import {mongo} from './db';
import * as emc from 'earthmc';
import * as Discord from 'discord.js';
import {omit} from 'lodash';
import {EmcPlayer, HomelessPlayer, StrangerPlayer} from './interfaces/player.interface';
import {getPlayers, noTown} from './discordCommands';
import {config} from './config';
import { calcEmcDistance } from './helpers/math';

let bot;

const THRESHOLD = 2000;
// const periodicity = 10000;

export const getPingTime = () => new Date(Date.now() - 60 * 1000);

const isClose = (player: EmcPlayer) => calcEmcDistance(config.townCoordinates, player) < THRESHOLD

const getCurrent = async (): Promise<Array<string>> => {
  return (
    await mongo.find<HomelessPlayer | StrangerPlayer>(config.mongo.collections.players, {
      pingTime: {$gte: getPingTime()},
    })
  ).map(player => player.name);
};

export const saveNearest = async () => {
  let allPlayers: Array<EmcPlayer>;
  let homelessPlayers: Array<EmcPlayer>;

  const current = await getCurrent();

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    allPlayers = await emc.getAllPlayers(emc);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    homelessPlayers = await emc.getTownless(emc);
  } catch (err) {
    console.log(err);
    throw err;
  }
  const external = allPlayers.filter(player => isClose(player) && player.town !== 'Svetlograd');
  const homeless = homelessPlayers.filter(isClose);
  const players = [...external, ...homeless];

  console.log(`Joueurs récupérés : ${players.map(p => p.name)}`);

  // NewOnes : Ceux qui sont dans players mais pas dans current
  const newOnes = players.filter(p => !current.includes(p.name));

  // LeftOnes : Ceux qui sont dans current mais pas dans players
  // const leftOnes = current.filter(c => !players.find(p => p.name === c));

  // Remaining : Ceux qui sont dans players et dans current
  const remaining = players.filter(p => current.includes(p.name)).map(p => p.name);

  if (newOnes.length) {
    console.log(`${newOnes.length} joueurs sont entrés dans la zone`);
    const d = new Date();
    await mongo.insertMany(
      config.mongo.collections.players,
      newOnes.map(p =>
        omit(
          {
            coords: [{x: p.x, y: p.y, z: p.z}],
            ...p,
            entryDate: d,
            pingTime: d,
          },
          ['x', 'y', 'z'],
        ),
      ),
    );
  }

  if (remaining.length) {
    console.log(`${remaining.length} joueurs sont restés dans la zone`);
    for (const player of remaining) {
      const playerObject = players.find(p => p.name === player);
      await mongo.updateMany(
        config.mongo.collections.players,
        {name: player},
        // On met à jour le pingTime du joueur trouvé
        {
          $set: {pingTime: new Date()},
          $push: {
            coords: {
              x: playerObject!!.x,
              y: playerObject!!.y,
              z: playerObject!!.z,
            },
          },
        },
      );
    }
  }
  console.log('Fin de contrôle');
};

export const init = () => {
  return new Promise<void>((resolve, _reject) => {
    bot = new Discord.Client();

    bot.on('ready', () => {
      console.log('Je suis connecté !');
      resolve();
    });

    // bot.login(config.botLogin).then(() => {
    //   setInterval(saveNearest, periodicity);
    // });

    bot.login(config.botLogin).then(() => {
      console.log('Connecté !');
    });

    bot.on('message', message => {
      (async () => {
        switch (message.content) {
          case '!online':
            message.reply(await getPlayers());
            return;
          case '!notown':
            message.reply(await noTown());
            return;
          default:
            return;
        }
      })();
    });
  });
};
