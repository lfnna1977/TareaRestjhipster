import { IPlayer } from 'app/shared/model/player.model';

export interface IClub {
  id?: number;
  name?: string;
  city?: string;
  telephone?: string;
  numSocios?: number;
  players?: IPlayer[];
}

export class Club implements IClub {
  constructor(
    public id?: number,
    public name?: string,
    public city?: string,
    public telephone?: string,
    public numSocios?: number,
    public players?: IPlayer[]
  ) {}
}
