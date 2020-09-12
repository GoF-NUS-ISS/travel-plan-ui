import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { TravelForm } from './travelForm';

@Component({
  selector: 'app-travel-leg',
  templateUrl: './travel-leg.component.html',
  styleUrls: ['./travel-leg.component.css']
})
export class TravelLegComponent implements OnInit {
  @Output() private onFormGroupChange = new EventEmitter<any>();
  travelForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.travelForm = this.fb.group({
      travellerDetails: this.fb.array([this.buildDetail()])
    }); 
    // this.onFormGroupChange.emit(this.travelForm);
  }
  get travellerDetails(): FormArray {
    return this.travelForm.get('travellerDetails') as FormArray;
  }
  addDetail(): void {
    this.travellerDetails.push(this.buildDetail());
  }
  deleteDetail(index: number): void{
    this.travellerDetails.removeAt(index);
  }

  buildDetail(): FormGroup {
    return this.fb.group({
      start: '',
      reach: '',
      startingOn: '',
      returningOn: '',
      transport: '',
      cost:null,
      source: '',
      destination: '',
      othertransport:''
    });
  }

}
