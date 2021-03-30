import {saveNearest} from './services/townBeacon';

export const initTownBeaconJobs = () => setInterval(saveNearest, 10000);
