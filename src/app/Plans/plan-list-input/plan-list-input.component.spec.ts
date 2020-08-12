import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanListInputComponent } from './plan-list-input.component';

describe('PlanListInputComponent', () => {
  let component: PlanListInputComponent;
  let fixture: ComponentFixture<PlanListInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanListInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanListInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
