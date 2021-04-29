export interface Beacon {
  playerName: string;
  lastRun: Date;
  playersInRange: Array<{
    name: string;
    nation?: string;
    rank?: string;
    town?: string;
    distance: number;
  }>;
  active: boolean;
}
