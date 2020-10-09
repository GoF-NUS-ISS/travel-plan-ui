import {  Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef  } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl, FormControlName } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Plans} from '../../Plans/plans'
import {PlanService} from '../../Plans/plan.service'
import { AuthService } from '../../user/auth.service';
import { ThrowStmt } from '@angular/compiler';
import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {GenericValidator} from '../../common/generic-validator'
import {NumberValidators} from '../../common/NumberValidators'
@Component({
    templateUrl: './travelplan-edit.component.html'
  })
  export class TravelplanEditComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    pageTitle = 'Plan Edit';
    form: FormGroup;
    plan:Plans;
    errorMessage: string;
    bubbleActivity:any;
    bubbleTravel:any;
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;
    private sub: Subscription;
    data:{};
    usname:string;
    uname=this.auth.currentUserInfo().then(value=>{
      this.usname=value;
      return value;
    }
    )
    ngOnInit() :void {
      this.form = this.fb.group({
        'title': ['', Validators.required],
        'name' : [this.usname],
        'days': this.fb.array([
          this.initX()
        ])
      });
      // this.form.valueChanges.subscribe(data => this.validateForm());
      // this.validateForm();
      this.sub = this.route.paramMap.subscribe(
        params => {
          const id = params.get('id');
          this.getPlan(id);
        }
      );
    }
  
    initX() {
      return this.fb.group({
        //  ---------------------forms fields on Day level ------------------------
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
        //  ---------------------forms fields on Node level ------------------------
      //   'type': ['leg'],
        // 'from': ['from', [Validators.required, Validators.pattern('[0-9]{3}')]],
        'from': [undefined],
        'to': [undefined],
        'startOn': [undefined],
        'returnDate': [undefined],
        'transportMode': [undefined],
        'cost': [undefined],
        'category':[undefined],
        'costActivity':[undefined],
        'rating':['', NumberValidators.range(1, 5)],
        'review':[undefined],
        'location': [undefined],
        'timeStart':[undefined],
        'timeEnd':[undefined]
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

      // for (let X = 0; X < plans.days.length; X++){
      //   const linesFormArray = this.form.get("lines") as FormArray;
      //   linesFormArray.push(this.initX());
        
      //   for (let Y=0; Y < plans.days[X].nodes.length; Y++){
      //     const playersFormsArray = linesFormArray.at(X).get("players") as FormArray;
      //     playersFormsArray.push(this.initY());
      //   }
      // }
  
      // Update the data on the form
      this.form.patchValue(
        {
        title: this.plan.title,
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
      this.Day.removeAt(index);
      this.Day.markAsDirty();
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
      control.removeAt(index);
      control.markAsDirty();
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
      control.markAsDirty();
    }
    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
      private auth:AuthService, private http: HttpClient,
      private planService:PlanService) {
        this.validationMessages = {
          title: {
            required: 'Title is required.',
          },
          rating: {
            range: 'Rate the activity between 1 (lowest) and 5 (highest).'
          }
        };
        this.genericValidator = new GenericValidator(this.validationMessages);
    }
  
    getPlan(id: string): void {
      this.planService.getPlan(id)
        .subscribe({
          next: (plans: Plans) => this.displayPlan(plans),
          error: err => this.errorMessage = err
        });
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
    if (this.form.valid) {
      if (this.form.dirty) {
      const p = { ...this.plan, ...removeEmpty(this.form.value) };
      console.log(p.id);
      console.log(JSON.stringify(this.form.value));
      console.log(removeEmpty(this.form.value));
      if (p.id === null) {
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
    }
    else {
      this.onSaveComplete();
    }
    }
    else {
      this.errorMessage = 'Please correct the validation errors.';
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
  
    ngOnDestroy(): void { 
      this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
      const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
      merge(this.form.valueChanges, ...controlBlurs).pipe(
        debounceTime(800)
      ).subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(this.form);
      });
    }
  }