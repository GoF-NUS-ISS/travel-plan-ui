import { Component, OnInit } from '@angular/core';
import { PlanService } from '../Service/plans.service';
import { ToastrService } from '../../common/toastr.service';

declare let toastr
@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css']
})
export class PlanListComponent implements OnInit {
  travels: any[];
  constructor(private planService:PlanService, private toastr: ToastrService) {
    
   }
  ngOnInit(): void {
    this.travels=this.planService.getPlans();
  }
  handleButtonClicked(travelName)
   {
     this.toastr.sucess(travelName);
   }
  }
  


