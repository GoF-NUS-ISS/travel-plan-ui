import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import {FormCreationService} from '../Create-Plan/form-creation/form.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  form: FormGroup;
 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  ngOnInit() {
    this.form = this.fb.group({
      'title': [],
      'Day': this.fb.array([
        this.initX()
      ])
    });
    this.form.valueChanges.subscribe(data => this.validateForm());
    this.validateForm();
  }

  initX() {
    return this.fb.group({
      //  ---------------------forms fields on x level ------------------------
      'X': [],
      // ---------------------------------------------------------------------
      'Travel': this.fb.array([
        this.initY()
      ]),
    });
  }

  initY() {
    return this.fb.group({
      //  ---------------------forms fields on y level ------------------------
      'from': ['from', [Validators.required, Validators.pattern('[0-9]{3}')]],
      'to': ['to', [Validators.required, Validators.pattern('[0-9]{3}')]],
      'tripstart': [],
      'return': ['return', [Validators.required, Validators.pattern('[0-9]{3}')]],
      'travelcost': [0, [Validators.required, Validators.pattern('[0-9]{3}')]],
      'transport': [''],
      // 'Y7': [''],
      // ---------------------------------------------------------------------
      'Activity': this.fb.array([
        this.initZ()
      ])
    })
  }

  initZ() {
    return this.fb.group({
      //  ---------------------forms fields on z level ------------------------
      'location': [],
      'category':[],
      'timestart':[],
      'timeend':[],
      'cost':[0,[Validators.required, Validators.pattern('[0-9]{3}')]],
      'starRating':[5, [Validators.required, Validators.pattern('[0-9]{3}')]],
      'reviewdescription':[]
      // ---------------------------------------------------------------------
    })
  }

  addX() {
    const control = <FormArray>this.form.controls['Day'];
    control.push(this.initX());
  }


  addY(ix) {
    const control = (<FormArray>this.form.controls['Day']).at(ix).get('Travel') as FormArray;
    control.push(this.initY());
  }
  deleteDetail(index): void{
    const control = (<FormArray>this.form.controls['Day']).at(index).get('Travel') as FormArray;
    control.removeAt(index);
  }

  addZ(ix, iy) {
    const control = ((<FormArray>this.form.controls['Day']).at(ix).get('Travel') as FormArray).at(iy).get('Activity') as FormArray;
    control.push(this.initZ());
  }
  
  deleteActivity(index,iy): void{
    const control = ((<FormArray>this.form.controls['Day']).at(index).get('Travel') as FormArray).at(iy).get('Activity') as FormArray;
    control.removeAt(index);
  }


  formErrors = {
    Day: this.DayErrors()
  };


  DayErrors() {
    return [{
      //  ---------------------forms errors on x level ------------------------
      X: '',

      // ---------------------------------------------------------------------
      'Travel': this.TravelErrors()

    }]

  }

  TravelErrors() {
    return [{
      //  ---------------------forms errors on y level ------------------------
      from: '',
      to: '',
      // ----------------------------------------------------------------------
      Activity: this.ActivityErrors()
    }]
  }

  ActivityErrors() {
    return [{
      //  ---------------------forms errors on z level ------------------------
      location: '',
      category:'',
      starRating:''

      // ---------------------------------------------------------------------


    }]
  }


  validationMessages = {
    Day: {
      X: {
        required: 'X is required.',
        pattern: 'X must be 3 characters long.'

      },
      Travel: {
        from: {
          required: 'from is required.',
          pattern: 'from must be 3 characters long.'
        },
        to: {
          required: 'to is required.',
          pattern: 'to must be 3 characters long.'
        },
        Activity: {
          location: {
            required: 'Z is required.',
            pattern: 'Z must be 3 characters long.',            
          },
          starRating: {
            required: 'Z is required.',
            pattern: 'Z must be numerical value.',            
          }
        }
      }
    }
  };
  // form validation
  validateForm() {
    this.validateDay();
  }
  validateDay() {
    let DayA = <FormArray>this.form['controls'].Day;
    console.log('validateDay');
    // console.log(DayA.value);
    this.formErrors.Day = [];
    let x = 1;
    while (x <= DayA.length) {
      this.formErrors.Day.push({
        X: '',
        Travel: [{
          from: '',
          to: '',
          Activity: [{
            location: '',
            category:'',
            starRating:''
          }]
        }]
      });
      let X = <FormGroup>DayA.at(x - 1);
      console.log('X--->');
      console.log(X.value);
      for (let field in X.controls) {
        let input = X.get(field);
        console.log('field--->');
        console.log(field);
        if (input.invalid && input.dirty) {
          for (let error in input.errors) {
            this.formErrors.Day[x - 1][field] = this.validationMessages.Day[field][error];
          }
        }
      }
      this.validateTravel(x);
      x++;
    }

  }

  validateTravel(x) {
    console.log('validateTravel');
    let TravelA = (<FormArray>this.form.controls['Day']).at(x - 1).get('Travel') as FormArray;
    this.formErrors.Day[x - 1].Travel = [];
    let y = 1;
    while (y <= TravelA.length) {
      this.formErrors.Day[x - 1].Travel.push({
        from: '',
        to: '',
        Activity: [{
          location: '',
          category:'',
          starRating:''
        }]
      });
      let Y = <FormGroup>TravelA.at(y - 1);
      for (let field in Y.controls) {
        let input = Y.get(field);
        if (input.invalid && input.dirty) {
          for (let error in input.errors) {
            this.formErrors.Day[x - 1].Travel[y - 1][field] = this.validationMessages.Day.Travel[field][error];

          }

        }
      }

      this.validateActivity(x, y);
      y++;
    }
  }

  validateActivity(x, y) {
    console.log('validateActivity--');
    let ActivityA = ((<FormArray>this.form.controls['Day']).at(x - 1).get('Travel') as FormArray).at(y - 1).get('Activity') as FormArray;
    this.formErrors.Day[x - 1].Travel[y - 1].Activity = [];
    let z = 1;
    while (z <= ActivityA.length) {
      this.formErrors.Day[x - 1].Travel[y - 1].Activity.push({
        location: '',
        category:'',
        starRating:''
      });
      let Z = <FormGroup>ActivityA.at(z - 1);
      for (let field in Z.controls) {
        let input = Z.get(field);
        console.log('input--->');
        console.log(input);
        if (input.invalid && input.dirty) {
          for (let error in input.errors) {
            this.formErrors.Day[x - 1].Travel[y - 1].Activity[z - 1][field] = this.validationMessages.Day.Travel.Activity[field][error];

          }

        }
      }

      // this.validateSamnumbers(x, y);
      z++;
    }
  }


  // deleteDetail(index: number): void{
  //   this.Y.removeAt(index);
  // }


  constructor(private fb: FormBuilder, private router: Router, 
    private formCreationService: FormCreationService, private http: HttpClient) {

  }
  publish() {
    let resource = JSON.stringify(this.form.value)
    console.log(resource);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
   });
   let options = {
      headers: headers
   }
  
    this.http.post("http://localhost:9527/myPlan/travelPlan", resource, options)
            .subscribe(
                data => console.log("success!", data),
                error => console.error("couldn't post because", error)
            );
    // this.formCreationService.publish(this.form.value).subscribe(result=>this.gotoPlansList());
  }
  gotoPlansList(){
    // this.router.navigate(['/user/login'])
    alert("Published successfully")
  }

}
