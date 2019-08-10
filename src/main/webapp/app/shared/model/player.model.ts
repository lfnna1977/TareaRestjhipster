import { ICountry } from 'app/shared/model/country.model';
import { IClub } from 'app/shared/model/club.model';

export const enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export interface IPlayer {
  id?: number;
  ci?: string;
  name?: string;
  gender?: Gender;
  position?: string;
  aditionalData?: string;
  country?: ICountry;
  club?: IClub;
}

export class Player implements IPlayer {
  constructor(
    public id?: number,
    public ci?: string,
    public name?: string,
    public gender?: Gender,
    public position?: string,
    public aditionalData?: string,
    public country?: ICountry,
    public club?: IClub
  ) {}
}
