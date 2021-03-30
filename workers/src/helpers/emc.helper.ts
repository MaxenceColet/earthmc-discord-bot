/* eslint-disable @typescript-eslint/no-unsafe-call */

import * as emc from 'earthmc';
import {config} from '../config';
import {EmcPlayer} from '../interfaces/player.interface';
import {calcEmcDistance} from './math.helper';

export const getAllPlayers = (): Promise<Array<EmcPlayer>> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return emc.getAllPlayers();
};

export const getTownless = (): Promise<Array<EmcPlayer>> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return emc.getTownless();
};
export const isClose = (player: EmcPlayer, coordinates = config.townCoordinates) =>
  calcEmcDistance(coordinates, player) < config.threshold;
