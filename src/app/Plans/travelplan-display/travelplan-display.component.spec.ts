import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelplanDisplayComponent } from './travelplan-display.component';

describe('TravelplanDisplayComponent', () => {
  let component: TravelplanDisplayComponent;
  let fixture: ComponentFixture<TravelplanDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelplanDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelplanDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
