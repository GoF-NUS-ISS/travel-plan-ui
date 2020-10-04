import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Plans} from '../plans'
import {PlanService} from '../plan.service'
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
    templateUrl: './travelplan-edit.component.html'
  })
  export class TravelplanEditComponent implements OnInit, AfterViewInit, OnDestroy {
    ngOnInit(): void {}
    ngOnDestroy(): void {}
    ngAfterViewInit(): void {}
  }