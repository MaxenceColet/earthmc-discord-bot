import * as emc from 'earthmc';
import {EmcPlayer} from './player.interface';

export const noTown = async () => {
  return (await emc.getTownless()).map((p: EmcPlayer) => p.name).join('  ');
};

export const getPlayers = async () => {
  return (await emc.getAllPlayers())
    .filter((player: EmcPlayer) => player.town == 'Svetlograd' && player.x != null)
    .join(' ');
};
