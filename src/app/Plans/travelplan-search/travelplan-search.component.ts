import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Plans} from '../plans';
import {PlanService} from '../plan.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-travelplan-search',
  templateUrl: './travelplan-search.component.html',
  styleUrls: ['./travelplan-search.component.css']
})
export class TravelplanSearchComponent implements OnInit, OnDestroy {
  plan: Plans;
  query: string;
  searchResults: Array<Plans>;
  sub: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private planService: PlanService) 
    {
      this.sub = this.route.params.subscribe(params => {
        if (params['term']) {
          this.query = decodeURIComponent(params['term']);
          this.searchPlan();
        }
      });
     }

  ngOnInit(): void {
  }

  searchPlan(): void{
    // this.planService.searchPlan(this.query).subscribe(
    //   data => {
    //     this.searchResults = data;
    //   },
    //   error => console.log(error)
    // );

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
