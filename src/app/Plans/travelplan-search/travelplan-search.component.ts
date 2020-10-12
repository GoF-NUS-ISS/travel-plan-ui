import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Plans} from '../plans';
import {Search} from '../search';
import {PlanService} from '../plan.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-travelplan-search',
  templateUrl: './travelplan-search.component.html',
  styleUrls: ['./travelplan-search.component.css']
})
export class TravelplanSearchComponent implements OnInit, OnDestroy {
  plan: Plans;
  search:Search;
  query: string;
  searchResults: Array<Plans>;
  sub: Subscription;
  searchForm: FormGroup;
  errorMessage: string;

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private planService: PlanService,
    private _notification: NotificationService) 
    {
      this.sub = this.route.params.subscribe(params => {
        if (params['term']) {
          this.query = decodeURIComponent(params['term']);
          this.searchPlan();
        }
      });
     }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      keyword: [''],
      site: [''],
      totalCostEnd: [''],
      totalCostStart: ['']
    });
  }

  searchPlan(): void{
    console.log(JSON.stringify(this.searchForm.value))
    const p = { ...this.search, ...this.searchForm.value };
    this.planService.searchPlan(p)
    .subscribe({
      next: () => this._notification.show('Search results'),
      error: err => this.errorMessage = err
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
