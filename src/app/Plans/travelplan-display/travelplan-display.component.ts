import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Plans} from '../plans'
import {PlanService} from '../plan.service'

@Component({
  selector: 'app-travelplan-display',
  templateUrl: './travelplan-display.component.html',
  styleUrls: ['./travelplan-display.component.css']
})
export class TravelplanDisplayComponent implements OnInit {
  pageTitle = 'Plan Detail';
  errorMessage = '';
  plans: Plans | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private planService: PlanService) { }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getProduct(id);
    }
  }
  getProduct(id: number) {
    this.planService.getPlan(id).subscribe({
      next: plans => this.plans = plans,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/PublishedPlans']);
  }

}
