import { Component, OnInit, ViewChild } from '@angular/core';
import { NavComponent } from '../../nav/nav.component';
import { Router } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Form } from './travel-leg/travelForm';
import {Activity} from './activity-leg/activityForm';
import { Observable } from 'rxjs';
import {FormCreationService} from './form.service';
import {overAll} from './overallForm';

@Component({
  selector: 'app-form-creation',
  templateUrl: './form-creation.component.html',
  styleUrls: ['./form-creation.component.css']
})
export class FormCreationComponent implements OnInit {
  isDirty:boolean=true
  latitude=51.678418
  longitude=7.809007
  overallForm: FormGroup;
  overall=new overAll;
  // form: any = {};
  form:overAll
  // form = new Form();
  constructor(private router: Router, private ob: FormBuilder, 
    private formCreationService: FormCreationService) { }
  cancel() {
    this.router.navigate(['Home'])
  }
  publish() {
    this.formCreationService.publish(this.form).subscribe(result=>this.gotoPlansList());
  }
  gotoPlansList(){
    this.router.navigate(['Home'])
  }
  save(){
   
  }
  onChoseLocation(event)
  {
    this.latitude=event.coords.lat;
    this.longitude=event.coords.lng;
  }
  ngOnInit(): void {
    this.overallForm = this.ob.group({
      // title: '',
      // description: '',
      // sendCatalog: true,
      formDetails: this.ob.array([this.buildDetail()])
    }); 
  }
  get formDetails(): FormArray {
    return this.overallForm.get('formDetails') as FormArray;
  }
  addDay(): void {
    this.formDetails.push(this.buildDetail());
  }
  deleteDay(index: number): void{
    this.formDetails.removeAt(index);
  }

  buildDetail(): FormGroup {
    return this.ob.group({
      date: ''
    });
  }

}
