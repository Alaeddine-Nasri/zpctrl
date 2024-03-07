export class BatteryModele {
  static nextId = 1;

  id: number;
  creationDate: number;
  degC: number;
  mA: number;
  mAh: number;
  V: number;
  charging: boolean;
  health: String;
  percent: number;
  constructor(
    creationDate: number,
    degC: number,
    mA: number,
    mAh: number,
    V: number,
    charging: boolean,
    health: string,
    percent: number
  ) {
    this.id = BatteryModele.nextId++;
    this.creationDate = creationDate;
    this.degC = degC;
    this.mA = mA;
    this.mAh = mAh;
    this.V = V;
    this.charging = charging;
    this.health = health;
    this.percent = percent;
  }
}
