import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControlName } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Plans } from '../../Plans/plans'
import { PlanService } from '../../Plans/plan.service'
import { AuthService } from '../../user/auth.service';
import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GenericValidator } from '../../common/generic-validator'
import { NumberValidators } from '../../common/NumberValidators'
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-travelplan-edit',
  templateUrl: './travelplan-edit.component.html',
  styleUrls: ['./travelplan-edit.component.css']
})
export class TravelplanEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  pageTitle = 'Plan Edit';
  form: FormGroup;
  plan: Plans;
  errorMessage: string;
  type: 'leg';
  bubbleActivity: any;
  bubbleTravel: any;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  private sub: Subscription;
  data: {};
  usname: string;
  uname = this.auth.currentUserInfo().then(value => {
    this.usname = value;
    return value;
  }
  )
  ngOnInit(): void {
    this.form = this.fb.group({
      'title': ['', Validators.required],
      'name': [this.usname],
      'id': null,
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
      'from': [''],
      'to': [''],
      'startOn': [''],
      'returnDate': [''],
      'transportMode': [''],
      'cost': ['', Validators.pattern("^[0-9]*$")],
      'category': [null],
      'costActivity': [null, Validators.pattern("^[0-9]*$")],
      'rating': [null, NumberValidators.range(1, 5)],
      'review': [null],
      'location': [null],
      'timeStart': [null],
      'timeEnd': [null]
    })
  }

  displayPlan(plans: Plans): void {
    if (this.form) {
      this.form.reset();
      //this.deleteDay(0);
      // this.deleteTravel(0,0);
    }
    this.plan = plans;

    if (this.plan.id === "0" || this.plan.id === null) {
      this.pageTitle = 'Add Plan';
      this.form.patchValue(
        {
          id: this.plan.id,
          name: this.usname,
          title: this.plan.title,
        });
    } else {
      this.pageTitle = `Edit Plan: ${this.plan.title}`;
      this.deleteDay(0);
      for (let dayarray = 0; dayarray < plans.days.length; dayarray++) {
        const daysFormArray = this.form.get("days") as FormArray;
        daysFormArray.push(this.initX());
        // for(let nodearray in plans.days[dayarray].nodes)
        for (let nodearray = 0; nodearray < plans.days[dayarray].nodes.length - 1; nodearray++) {
          const nodesFormsArray = daysFormArray.at(dayarray).get("nodes") as FormArray;
          nodesFormsArray.push(this.initY());
        }
      }
      this.form.patchValue(plans);
    }

    // for (let line = 0; line < plans.days.length; line++){
    //   const daysFormArray = this.form.get("days") as FormArray;
    //   daysFormArray.push(this.initX());

    //   for (let player=0; player < plans.days[line].nodes.length; player++){
    //     const nodesFormsArray = daysFormArray.at(line).get("nodes") as FormArray;
    //     nodesFormsArray.push(this.initY());
    //   }
    // }
    //patch the form:
    this.form.patchValue(plans);

    // Update the data on the form
    // this.form.patchValue(
    //   {
    //   id:this.plan.id,
    //   name:this.usname,
    //   title: this.plan.title,
    // });
    //this.form.setControl('days', this.fb.array(this.plan.days || []));
    // (this.form.get('days') as FormGroup).setControl('date', new FormControl(this.plan.days))

  }
  get Day(): FormArray {
    return this.form.get('days') as FormArray;
  }

  addDay(): void {
    this.Day.push(this.initX())
  }

  deleteDay(index: number): void {
    this.Day.removeAt(index);
    this.Day.markAsDirty();
  }

  addTravel(ix) {
    this.bubbleTravel = true;
    this.bubbleActivity = false;
    const control = (<FormArray>this.form.controls['days']).at(ix).get('nodes') as FormArray;
    control.push(
      this.fb.group({
        type: 'leg',
        from: '',
        to: '',
        startOn: '',
        returnDate: '',
        transportMode: '',
        cost: '',
        category: null,
        costActivity: null,
        rating: null,
        review: null,
        location: null,
        timeStart: null,
        timeEnd: null
      })
    )
  }
  deleteTravel(ix, index): void {
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
          startOn: null,
          returnDate: null,
          transportMode: null,
          cost: null,
          category: '',
          costActivity: '',
          rating: '',
          review: '',
          location: '',
          timeStart: '',
          timeEnd: ''
        })
      )
  }

  deleteActivity(ix, index): void {
    const control = (<FormArray>this.form.controls['days']).at(ix).get('nodes') as FormArray;
    control.removeAt(index)
    control.markAsDirty();
  }
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private auth: AuthService, private http: HttpClient, private _notification: NotificationService,
    private planService: PlanService) {
    this.validationMessages = {
      title: {
        required: 'Title is required.',
      },
      cost: {
        pattern: 'Enter only numbers'
      },
      costActivity: {
        pattern: 'Enter only numbers'
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
        console.log('Name:' + this.usname);
        console.log(JSON.stringify(this.form.value));
        console.log(removeEmpty(this.form.value));
        if (p.id === "0") {
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
  }
  onSaveComplete(): void {
    // Reset the form to clear the flags
    this._notification.show('Form Submitted successfully')
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