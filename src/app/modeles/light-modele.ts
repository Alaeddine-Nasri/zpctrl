export class LightModele {
  static nextId = 1;

  id: number;
  creationDate: Date;
  light: number;
  constructor(creationDate: Date, light: number) {
    this.id = LightModele.nextId;
    this.creationDate = creationDate;
    this.light = light;
  }
}
