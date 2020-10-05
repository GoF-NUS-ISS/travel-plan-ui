import {  Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef  } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Plans} from '../../Plans/plans'
import {PlanService} from '../../Plans/plan.service'
import { AuthService } from '../../user/auth.service';
import { ThrowStmt } from '@angular/compiler';
@Component({
    templateUrl: './travelplan-edit.component.html'
  })
  export class TravelplanEditComponent implements OnInit, AfterViewInit, OnDestroy {
    pageTitle = 'Plan Edit';
    form: FormGroup;
    plan:Plans;
    errorMessage: string;
    bubbleActivity:any;
    bubbleTravel:any;
    data:{};
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
        'review':[],
        'location': [],
        'timeStart':[],
        'timeEnd':[]
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
      //   'review':[],
      //   'location': [],
      //   'timeStart':[],
      //   'timeEnd':[]
        // 'rating':[5, [Validators.required, Validators.pattern('[0-9]{3}')]],
        // ---------------------------------------------------------------------
      })
    }
    displayPlan(plans: Plans): void {
      if (this.form) {
        this.form.reset();
      }
      this.plan = plans;
  
      if (this.plan.id === null) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.plan.title}`;
      }
  
      // Update the data on the form
      this.form.patchValue({
        productName: this.plan.title,
        // productCode: this.product.productCode,
        // starRating: this.product.starRating,
        // description: this.product.description
      });
      this.form.setControl('days', this.fb.array(this.plan.days || []));
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
              review:null,
              location:null,
              timeStart:null,
              timeEnd:null
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
              review:'',
              location:'',
              timeStart:'',
              timeEnd:''
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
  
    publish() {
      const p = { ...this.plan, ...this.form.value };
      console.log(p.id);
      if (p.id === undefined) {
        this.planService.createPlan(p)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      } else {
        this.planService.updatePlan(p)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    // } else {
    //   this.onSaveComplete();
    // }
  // } else {
  //   this.errorMessage = 'Please correct the validation errors.';
  // }

    //   let resource = this.form.value
    //   const removeEmpty = (obj) => {
    //     Object.keys(obj).forEach(key => {
    //        if (obj[key] && typeof obj[key] === "object") {
    //          // recursive
    //          removeEmpty(obj[key]);
    //        } else if (obj[key] === null) {
    //          delete obj[key];
    //        }
    //      });
    //      return obj;
    //   };
    //   console.log(JSON.stringify(resource));
    //   console.log("new obj :" + removeEmpty(resource));
    //   // console.log(resource);
    //   let headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'responseType': 'text'
    //     // 'Authorization': "Bearer "+ this.auth.getAccessToken()
    //  });
    //  let options = {
    //     headers: headers
    //  }
    
    //   this.http.post("http://localhost:9527/myPlan/travelPlan", resource, options)
    //           .subscribe(
    //               data => console.log("success!", data),
    //               error => console.error("couldn't post because", error)
    //           );
    }
    onSaveComplete(): void {
      // Reset the form to clear the flags
      this.form.reset();
      this.router.navigate(['/plans']);
    }
  
    ngOnDestroy(): void {}
    ngAfterViewInit(): void {}
  }