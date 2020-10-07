import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {Activity} from './activityForm';

@Component({
  selector: 'app-activity-leg',
  templateUrl: './activity-leg.component.html',
  styleUrls: ['./activity-leg.component.css']
})
export class ActivityLegComponent implements OnInit {

activityForm:FormGroup;
activity=new Activity();
  constructor(private ab: FormBuilder) {

   }

  ngOnInit(): void {
    this.activityForm = this.ab.group({
      // location: '',
      // description: '',
      // time: '',
      // cost:'',
      activityDetails: this.ab.array([this.buildActivity()])
    }); 
  }
  get activityDetails(): FormArray {
    return this.activityForm.get('activityDetails') as FormArray;
  }
  addActivity(): void {
    this.activityDetails.push(this.buildActivity());
  }
  deleteActivity(index: number): void{
    this.activityDetails.removeAt(index);
  }
  buildActivity(): FormGroup {
    return this.ab.group({
      location: '',
      category: '',
      timestart: '',
      timeend:'',
      cost:'',
      starRating:null,
      reviewdescription:''
    });
}
}
