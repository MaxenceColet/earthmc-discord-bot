/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as emc from 'earthmc';
import {EmcPlayer} from './player.interface';

export const noTown = async (): Promise<string> => {
  return (await emc.getTownless()).map((p: EmcPlayer) => p.name).join('  ');
};

export const getPlayers = async (): Promise<string> => {
  return (await emc.getAllPlayers())
    .filter((player: EmcPlayer) => player.town === 'Svetlograd' && player.x != null)
    .join(' ');
};
