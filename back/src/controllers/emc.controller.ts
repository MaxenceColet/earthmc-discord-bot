/* eslint-disable @typescript-eslint/no-unsafe-call */

import * as emc from 'earthmc';
import {EmcPlayer} from '../interfaces/player.interface';

export const getAllPlayers = (): Promise<Array<EmcPlayer>> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return emc.getAllPlayers();
};

export const getTownless = (): Promise<Array<EmcPlayer>> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return emc.getTownless();
};
