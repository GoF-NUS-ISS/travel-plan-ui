import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLegComponent } from './activity-leg.component';

describe('ActivityLegComponent', () => {
  let component: ActivityLegComponent;
  let fixture: ComponentFixture<ActivityLegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityLegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityLegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
