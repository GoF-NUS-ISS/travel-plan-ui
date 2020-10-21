import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelplanSearchComponent } from './travelplan-search.component';

describe('TravelplanSearchComponent', () => {
  let component: TravelplanSearchComponent;
  let fixture: ComponentFixture<TravelplanSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelplanSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelplanSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
