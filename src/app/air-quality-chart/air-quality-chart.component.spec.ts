import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirQualityChartComponent } from './air-quality-chart.component';

describe('AirQualityChartComponent', () => {
  let component: AirQualityChartComponent;
  let fixture: ComponentFixture<AirQualityChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirQualityChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AirQualityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
