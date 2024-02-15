export class LightModele {
  id?: string;
  creationDate: number;
  light: number;
  constructor(creationDate: number, light: number) {
    this.creationDate = creationDate;
    this.light = light;
  }
}
