import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelplanListComponent } from './travelplan-list.component';

describe('TravelplanListComponent', () => {
  let component: TravelplanListComponent;
  let fixture: ComponentFixture<TravelplanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelplanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelplanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
