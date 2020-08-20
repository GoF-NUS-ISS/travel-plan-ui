import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../nav/nav.component';
import { Router } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
      description: ''
    }); 
  }

}

