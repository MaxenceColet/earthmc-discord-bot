import {updatePlayersBeacon} from './services/playerBeacon';
import {saveNearest} from './services/townBeacon';

export const initTownBeaconJobs = () => setInterval(saveNearest, 10000);
export const initPlayerBeaconJobs = () => setTimeout(() => setInterval(updatePlayersBeacon, 10000), 5000);
