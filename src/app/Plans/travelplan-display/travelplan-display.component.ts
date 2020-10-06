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
  plan: Plans;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private planService: PlanService) { }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      //this.route.snapshot.params['id'];
      // const id = param;
      const id = param
      this.getPlan(id);
    }
  }
  getPlan(id: string) {
    this.planService.getPlan(id).subscribe({
      next: plan => this.plan = plan,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/plans']);
  }

}
