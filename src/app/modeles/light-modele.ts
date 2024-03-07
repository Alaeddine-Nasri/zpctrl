export class LightModele {
  static nextId = 1;

  id: number;
  creationDate: Date;
  light: number;
  company: string;
  device: string;
  constructor(creationDate: Date, light: number, company: string, device:string) {
    this.id = LightModele.nextId;
    this.creationDate = creationDate;
    this.light = light;
    this.company = company;
    this.device = device;
  }
}
