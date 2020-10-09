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
    selector: 'app-travelplan-edit',
    templateUrl: './travelplan-edit.component.html',
    styleUrls: ['./travelplan-edit.component.css']
  })
  export class TravelplanEditComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    pageTitle = 'Plan Edit';
    form: FormGroup;
    plan:Plans;
    errorMessage: string;
    type: 'leg';
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
        'name' : [''],
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
        'type': ['leg'],
        // 'from': ['from', [Validators.required, Validators.pattern('[0-9]{3}')]],
        'from': [null],
        'to': [null],
        'startOn': [null],
        'returnDate': [null],
        'transportMode': [null],
        'cost': [null],
        // 'category':[''],
        // 'costActivity':[''],
        // 'rating':['', NumberValidators.range(1, 5)],
        // 'review':[''],
        // 'location': [''],
        // 'timeStart':[''],
        // 'timeEnd':['']
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
      this.form.patchValue(
        {
        id:this.plan.id,
        name:this.usname,
        title: this.plan.title,
      });
      //this.form.setControl('days', this.fb.array(this.plan.days || []));
      // (this.form.get('days') as FormGroup).setControl('date', new FormControl(this.plan.days))

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
         } else if (obj[key] === '') {
           delete obj[key];
         }
       });
       return obj;
    };
    if (this.form.valid) {
      if (this.form.dirty) {
      const p = { ...this.plan, ...removeEmpty(resource) };
      console.log(p.id);
      console.log('Name:'+this.usname);
      console.log(JSON.stringify(resource));
      console.log(removeEmpty(resource));
      if (p.id === "0") {
        this.planService.createPlan(p)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });

    //           let headers = new HttpHeaders({
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