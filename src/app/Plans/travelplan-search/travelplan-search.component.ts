import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plans } from '../plans';
import { Search } from '../search';
import { PlanService } from '../plan.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-travelplan-search',
  templateUrl: './travelplan-search.component.html',
  styleUrls: ['./travelplan-search.component.css']
})
export class TravelplanSearchComponent implements OnInit, OnDestroy {
  plan: Plans;
  search: Search;
  query: string;
  searchResults: Array<Plans>;
  sub: Subscription;
  searchForm: FormGroup;
  errorMessage: string;
  usname: string;
  uname = this.auth.currentUserInfo().then(value => {
    this.usname = value;
    return value;
  }
  )

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private planService: PlanService,
    private _notification: NotificationService,
    private auth: AuthService) {
    this.sub = this.route.params.subscribe(params => {
      if (params['term']) {
        this.query = decodeURIComponent(params['term']);
        this.searchPlan();
      }
    });
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      category: [''],
      description: [''],
      endCost: ['', Validators.pattern("^[0-9]*$")],
      name:[this.usname],
      stars:[''],
      startCost: ['', Validators.pattern("^[0-9]*$")]
    });
  }

  get f() {
    return this.searchForm.controls;
  }

  searchPlan(): void {
    console.log(JSON.stringify(this.searchForm.value))
    const p = { ...this.search, ...this.searchForm.value };
    this.planService.searchPlan(p)
      .subscribe({
        next: () => this._notification.show('Your Plan is being generated, it will be displayed in your plans in few minutes'),
        error: err => this.errorMessage = err
      });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
