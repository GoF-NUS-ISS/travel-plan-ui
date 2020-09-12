import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { NavComponent } from '../../nav/nav.component';
import { Router } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { TravelForm } from './travel-leg/travelForm';
import {Activity} from './activity-leg/activityForm';
import { Observable } from 'rxjs';
import {FormCreationService} from './form.service';
import {overAll} from './overallForm';
import { TravelLegComponent } from './travel-leg/travel-leg.component';
import { ActivityLegComponent } from './activity-leg/activity-leg.component';

@Component({
  selector: 'app-form-creation',
  templateUrl: './form-creation.component.html',
  styleUrls: ['./form-creation.component.css']
})
export class FormCreationComponent implements OnInit, AfterViewInit {
  formCheck :any  = '' 
  public onFormGroupChangeEvent(_event) {
    this.formCheck = _event;
    console.error(_event, this.formCheck['controls'])
  }
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
  ngAfterViewInit(){
    // console.log(this.childComponent1.toArray().length);  
  }
  
  onChoseLocation(event)
  {
    this.latitude=event.coords.lat;
    this.longitude=event.coords.lng;
  }
  
  ngOnInit(): void {
    this.overallForm = this.ob.group({
      title: '',
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
      date: '',
    });
  }
  publish() {
    console.log('Saved: ' + JSON.stringify(this.overallForm.value));
    this.formCreationService.publish(this.form).subscribe(result=>this.gotoPlansList());
  }
  gotoPlansList(){
    this.router.navigate(['Home'])
  }
  save(){
   
  }

}

