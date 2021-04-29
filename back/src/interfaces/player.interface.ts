export interface Coordinates {
  x: number;
  y: number;
  z: number;
}

export interface BasePlayer {
  isUnderground: boolean;
  nickname: string;
  name: string;
  entryDate: Date;
  pingTime: Date;
}

export interface StrangerPlayer extends BasePlayer {
  nation: string;
  rank?: string;
  town: string;
  coords: Array<Coordinates>;
}

export interface HomelessPlayer extends BasePlayer {
  coords: Array<Coordinates>;
}

export type DbPlayer = HomelessPlayer | StrangerPlayer;

export interface EmcPlayer extends BasePlayer {
  x: number;
  y: number;
  z: number;
  nation?: string;
  rank?: string;
  town?: string;
}
