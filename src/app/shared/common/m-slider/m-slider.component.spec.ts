import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MSliderComponent } from './m-slider.component';

describe('MSliderComponent', () => {
  let component: MSliderComponent;
  let fixture: ComponentFixture<MSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
