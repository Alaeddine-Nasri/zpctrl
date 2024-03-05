import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRightbarComponent } from './details-rightbar.component';

describe('DetailsRightbarComponent', () => {
  let component: DetailsRightbarComponent;
  let fixture: ComponentFixture<DetailsRightbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsRightbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsRightbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
