import { IPlayer } from 'app/shared/model/player.model';

export interface ICountry {
  id?: number;
  code?: string;
  name?: string;
  players?: IPlayer[];
}

export class Country implements ICountry {
  constructor(public id?: number, public code?: string, public name?: string, public players?: IPlayer[]) {}
}
