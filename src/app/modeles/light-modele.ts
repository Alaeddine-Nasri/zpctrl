export class LightModele {
  static nextId = 1;

  id: number;
  creationDate: number;
  light: number;
  constructor(creationDate: number, light: number) {
    this.id = LightModele.nextId;
    this.creationDate = creationDate;
    this.light = light;
  }
}
