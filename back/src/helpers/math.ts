import {Coordinates, DbPlayer, EmcPlayer} from '../player.interface';

export const calcDbDistance = (source: Coordinates, player: DbPlayer) => {
  const latestCoords = player.coords[player.coords.length - 1];
  return Math.sqrt(Math.abs(source.x - latestCoords.x) ** 2 + Math.abs(source.z - latestCoords.z) ** 2);
};

export const calcEmcDistance = (source: Coordinates, player: EmcPlayer) => {
  return Math.sqrt(Math.abs(source.x - player.x) ** 2 + Math.abs(source.z - player.z) ** 2);
};
