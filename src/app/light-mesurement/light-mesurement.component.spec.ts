import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightMesurementComponent } from './light-mesurement.component';

describe('LightMesurementComponent', () => {
  let component: LightMesurementComponent;
  let fixture: ComponentFixture<LightMesurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LightMesurementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LightMesurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
