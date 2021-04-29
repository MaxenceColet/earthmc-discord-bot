import {config} from '../config';
import {mongo} from '../helpers/mongo.helper';
import {Beacon} from '../interfaces/beacons.interface';
import * as emc from '../helpers/emc.helper';
import {calcEmcDistance} from '../helpers/math.helper';

export const updatePlayersBeacon = async () => {
  const onlinePlayers = (await emc.getAllPlayers()).filter(p => p.x != null);
  const activeTownPlayers = onlinePlayers.filter(p => p.town === 'Svetlograd');
  const beacons = await mongo.find<Beacon>(config.mongo.collections.beacons, {
    active: true,
    playerName: {$in: activeTownPlayers.map(p => p.name)},
  });
  console.log(`${beacons.length} beacons trouvés`);
  for (const beacon of beacons) {
    const beaconPlayer = onlinePlayers.find(player => player.name === beacon.playerName);
    if (!beaconPlayer) {
      console.log(`Joueur ${beacon.playerName} introuvable`)
      continue;
    }
    const closePlayers = onlinePlayers.filter(player => emc.isClose(player, beaconPlayer));
    console.log(`${closePlayers.length} joueurs à proximité de ${beacon.playerName}`);
    await mongo.upsert<Beacon>(
      config.mongo.collections.beacons,
      {playerName: beacon.playerName},
      {
        ...beacon,
        playersInRange: closePlayers.map(player => ({
          distance: calcEmcDistance(beaconPlayer, player),
          name: player.name,
          nation: player.nation,
          rank: player.rank,
          town: player.town,
        })),
      },
    );
  }
};
