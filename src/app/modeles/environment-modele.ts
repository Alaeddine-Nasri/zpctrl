export class EnvironmentModele {
  static nextId = 1;

  id: number;
  creationDate: Date;
  co2EquivalentAccuracy: number;
  iaqAccuracy: number;
  breathVocValue: number;
  co2EquivalentValue: number;
  temperature: number;
  humidity: number;
  pressure: number;
  iaqValue: number;
  breathVocAccuracy: number;
  constructor(
    creationDate: Date,
    co2EquivalentAccuracy: number,
    iaqAccuracy: number,
    breathVocValue: number,
    co2EquivalentValue: number,
    temperature: number,
    humidity: number,
    pressure: number,
    iaqValue: number,
    breathVocAccuracy: number) 
    {
      this.id = EnvironmentModele.nextId++;
      this.creationDate = creationDate;
      this.co2EquivalentAccuracy = co2EquivalentAccuracy;
      this.iaqAccuracy = iaqAccuracy;
      this.breathVocValue = breathVocValue;
      this.co2EquivalentValue = co2EquivalentValue;
      this.temperature = temperature;
      this.humidity = humidity;
      this.pressure = pressure;
      this.iaqValue = iaqValue;
      this.breathVocAccuracy = breathVocAccuracy;
    }
}
