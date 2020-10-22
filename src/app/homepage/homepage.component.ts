import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import {FormCreationService} from '../Create-Plan/form-creation/form.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Plans} from '../Plans/plans'
import {PlanService} from '../Plans/plan.service'
import { AuthService } from '../user/auth.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  form: FormGroup;
  plan:Plans;
  errorMessage: string;
  bubbleActivity:any;
  bubbleTravel:any;
  data:{};
//  httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type':  'application/json',
//       'responseType': 'text',
//       'Authorization': "Bearer "+ this.auth.getAccessToken()
//     })
//   };

  ngOnInit() {
    this.form = this.fb.group({
      'title': [],
      'days': this.fb.array([
        this.initX()
      ])
    });
    // this.form.valueChanges.subscribe(data => this.validateForm());
    // this.validateForm();
  }

  initX() {
    return this.fb.group({
      //  ---------------------forms fields on x level ------------------------
      'date': [],
      // ---------------------------------------------------------------------
      'nodes': this.fb.array([
        this.initY(),
        // this.initZ()
      ]),
    });
  }

  initY() {
    return this.fb.group({
      //  ---------------------forms fields on y level ------------------------
    //   'type': ['leg'],
      // 'from': ['from', [Validators.required, Validators.pattern('[0-9]{3}')]],
      'from': [],
      'to': [],
      'startOn': [],
      'returnDate': [],
      'transportMode': [],
      'cost': [],
      'category':[],
      'costActivity':[],
      'rating':[],
      'reviewdescription':[],
      'location': [],
      'timestart':[],
      'timeend':[]
      // 'Y7': [''],
      // ---------------------------------------------------------------------
      // 'Activity': this.fb.array([
      //   this.initZ()
      // ])
    })
  }

  initZ() {
    return this.fb.group({
      //  ---------------------forms fields on z level ------------------------
      'type': ['activity'],
    //   'category':[],
    //   'cost':[],
    //   'rating':[],
    //   'reviewdescription':[],
    //   'location': [],
    //   'timestart':[],
    //   'timeend':[]
      // 'rating':[5, [Validators.required, Validators.pattern('[0-9]{3}')]],
      // ---------------------------------------------------------------------
    })
  }

  get Day():FormArray{
    return this.form.get('days') as FormArray;
  }

  addDay() : void{
    this.Day.push(this.initX())
  }

  deleteDay(index: number): void{
    this.Day.removeAt(index)
  }

  addTravel(ix){
    this.bubbleTravel = true;
    this.bubbleActivity = false;
    const control = (<FormArray>this.form.controls['days']).at(ix).get('nodes') as FormArray;
    control.push(
        this.fb.group({
            type: 'leg',
            from: '',
            to: '',
            startOn:'',
            returnDate:'',
            transportMode:'',
            cost:'',
            category: null,
            costActivity: null,
            rating:null,
            reviewdescription:null,
            location:null,
            timestart:null,
            timeend:null
          })
    )
  }
  deleteTravel(ix, index): void{
    const control = (<FormArray>this.form.controls['days']).at(ix).get('nodes') as FormArray;
    control.removeAt(index)
  }

  addActivity(ix) {
    this.bubbleActivity = true;
    this.bubbleTravel = false;
    const control = (<FormArray>this.form.controls['days']).at(ix).get('nodes') as FormArray;
    control.push
    (
        this.fb.group({
            type: 'activity',
            from: null,
            to: null,
            startOn:null,
            returnDate:null,
            transportMode:null,
            cost:null,
            category: '',
            costActivity: '',
            rating:'',
            reviewdescription:'',
            location:'',
            timestart:'',
            timeend:''
          })
    )
  }

  deleteActivity(ix,index): void{
    const control = (<FormArray>this.form.controls['days']).at(ix).get('nodes') as FormArray;
    control.removeAt(index)
  }



  // formErrors = {
  //   days: this.DayErrors()
  // };


  // DayErrors() {
  //   return [{
  //     //  ---------------------forms errors on x level ------------------------
  //     date: '',

  //     // ---------------------------------------------------------------------
  //     'nodes': this.TravelErrors()

  //   }]

  // }

  // TravelErrors() {
  //   return [{
  //     //  ---------------------forms errors on y level ------------------------
  //     from: '',
  //     to: '',
  //     // ----------------------------------------------------------------------
  //     Activity: this.ActivityErrors()
  //   }]
  // }

  // ActivityErrors() {
  //   return [{
  //     //  ---------------------forms errors on z level ------------------------
  //     location: '',
  //     category:'',
  //     rating:''

  //     // ---------------------------------------------------------------------


  //   }]
  // }


  // validationMessages = {
  //   days: {
  //     date: {
  //       required: 'X is required.',
  //       pattern: 'X must be 3 characters long.'

  //     },
  //     nodes: {
  //       from: {
  //         required: 'from is required.',
  //         pattern: 'from must be 3 characters long.'
  //       },
  //       to: {
  //         required: 'to is required.',
  //         pattern: 'to must be 3 characters long.'
  //       },
  //       Activity: {
  //         location: {
  //           required: 'Z is required.',
  //           pattern: 'Z must be 3 characters long.',
  //         },
  //         rating: {
  //           required: 'Z is required.',
  //           pattern: 'Z must be numerical value.',
  //         }
  //       }
  //     }
  //   }
  // };
  // // form validation
  // validateForm() {
  //   this.validateDay();
  // }
  // validateDay() {
  //   let DayA = <FormArray>this.form['controls'].days;
  //   console.log('validateDay');
  //   // console.log(DayA.value);
  //   this.formErrors.days = [];
  //   let x = 1;
  //   while (x <= DayA.length) {
  //     this.formErrors.days.push({
  //       date: '',
  //       nodes: [{
  //         from: '',
  //         to: '',
  //         Activity: [{
  //           location: '',
  //           category:'',
  //           rating:''
  //         }]
  //       }]
  //     });
  //     let X = <FormGroup>DayA.at(x - 1);
  //     console.log('X--->');
  //     console.log(X.value);
  //     for (let field in X.controls) {
  //       let input = X.get(field);
  //       console.log('field--->');
  //       console.log(field);
  //       if (input.invalid && input.dirty) {
  //         for (let error in input.errors) {
  //           this.formErrors.days[x - 1][field] = this.validationMessages.days[field][error];
  //         }
  //       }
  //     }
  //     this.validateTravel(x);
  //     x++;
  //   }

  // }

  // validateTravel(x) {
  //   console.log('validateTravel');
  //   let TravelA = (<FormArray>this.form.controls['days']).at(x - 1).get('nodes') as FormArray;
  //   this.formErrors.days[x - 1].nodes = [];
  //   let y = 1;
  //   while (y <= TravelA.length) {
  //     this.formErrors.days[x - 1].nodes.push({
  //       from: '',
  //       to: '',
  //       Activity: [{
  //         location: '',
  //         category:'',
  //         rating:''
  //       }]
  //     });
  //     let Y = <FormGroup>TravelA.at(y - 1);
  //     for (let field in Y.controls) {
  //       let input = Y.get(field);
  //       if (input.invalid && input.dirty) {
  //         for (let error in input.errors) {
  //           this.formErrors.days[x - 1].nodes[y - 1][field] = this.validationMessages.days.nodes[field][error];

  //         }

  //       }
  //     }

  //     this.validateActivity(x, y);
  //     y++;
  //   }
  // }

  // validateActivity(x, y) {
  //   console.log('validateActivity--');
  //   let ActivityA = ((<FormArray>this.form.controls['days']).at(x - 1).get('nodes') as FormArray).at(y - 1).get('Activity') as FormArray;
  //   this.formErrors.days[x - 1].nodes[y - 1].Activity = [];
  //   let z = 1;
  //   while (z <= ActivityA.length) {
  //     this.formErrors.days[x - 1].nodes[y - 1].Activity.push({
  //       location: '',
  //       category:'',
  //       rating:''
  //     });
  //     let Z = <FormGroup>ActivityA.at(z - 1);
  //     for (let field in Z.controls) {
  //       let input = Z.get(field);
  //       console.log('input--->');
  //       console.log(input);
  //       if (input.invalid && input.dirty) {
  //         for (let error in input.errors) {
  //           this.formErrors.days[x - 1].nodes[y - 1].Activity[z - 1][field] = this.validationMessages.days.nodes.Activity[field][error];

  //         }

  //       }
  //     }

  //     // this.validateSamnumbers(x, y);
  //     z++;
  //   }
  // }


  // deleteDetail(index: number): void{
  //   this.Y.removeAt(index);
  // }


  constructor(private fb: FormBuilder, private router: Router,
    private auth:AuthService, private http: HttpClient,
    private planService:PlanService) {

  }

  getPlan(id: string): void {
    this.planService.getPlan(id)
      .subscribe({
        next: (plans: Plans) => this.displayPlan(plans),
        error: err => this.errorMessage = err
      });
  }

  displayPlan(plans: Plans): void {
    if (this.form) {
      this.form.reset();
    }
    this.plan = plans;

    // if (this.plan.id === 0) {
    //   this.pageTitle = 'Add Product';
    // } else {
    //   this.pageTitle = `Edit Product: ${this.product.productName}`;
    // }

    // Update the data on the form
    this.form.patchValue({
      title: this.plan.title,
      day: this.plan.days,
    });
    // this.form.setControl('tags', this.fb.array(this.plan.tags || []));
  }

  publish() {
    let resource = this.form.value
    const removeEmpty = (obj) => {
      Object.keys(obj).forEach(key => {
         if (obj[key] && typeof obj[key] === "object") {
           // recursive
           removeEmpty(obj[key]);
         } else if (obj[key] === null) {
           delete obj[key];
         }
       });
       return obj;
    };
    console.log(JSON.stringify(resource));
    console.log("new obj :" + removeEmpty(resource));
    // console.log(resource);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'text'
      // 'Authorization': "Bearer "+ this.auth.getAccessToken()
   });
   let options = {
      headers: headers
   }

    this.http.get("http://52.201.228.117:9527/mySearch/elastic/createIndex")
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
