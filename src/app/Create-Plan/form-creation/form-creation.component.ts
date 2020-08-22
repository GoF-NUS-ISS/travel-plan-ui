import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../nav/nav.component';
import { Router } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Form } from './Form';

@Component({
  selector: 'app-form-creation',
  templateUrl: './form-creation.component.html',
  styleUrls: ['./form-creation.component.css']
})
export class FormCreationComponent implements OnInit {
  isDirty:boolean=true
  latitude=51.678418
  longitude=7.809007
  travelForm: FormGroup;

  form = new Form();
  constructor(private router: Router, private fb: FormBuilder) { }
  cancel() {
    this.router.navigate(['Home'])
  }
  publish() {
    this.router.navigate(['PublishedPlans'])
  }
  save(){
    console.log(this.travelForm);
    console.log('Saved: ' + JSON.stringify(this.travelForm.value));
  }
  onChoseLocation(event)
  {
    this.latitude=event.coords.lat;
    this.longitude=event.coords.lng;
  }
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
      source: '',
      destination: '',
      startingOn: '',
      returningOn: ''
    });
  }

}

