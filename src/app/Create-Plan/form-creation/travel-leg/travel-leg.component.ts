import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Form } from './travelForm';

@Component({
  selector: 'app-travel-leg',
  templateUrl: './travel-leg.component.html',
  styleUrls: ['./travel-leg.component.css']
})
export class TravelLegComponent implements OnInit {
  travelForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.travelForm = this.fb.group({
      title: '',
      description: '',
      sendCatalog: true,
      travellerDetails: this.fb.array([this.buildDetail()])
    }); 
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
      firstName: '',
      lastName: '',
      start: '',
      reach: '',
      startingOn: '',
      returningOn: '',
      transport: '',
      bookedTicket:'',
      source: '',
      destination: '',
      yetToBook:''
    });
  }

}
