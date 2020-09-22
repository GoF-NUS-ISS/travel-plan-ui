import { Component, OnInit } from '@angular/core';
import {Plans} from '../plans'
import {PlanService} from '../plan.service'

@Component({
  selector: 'app-travelplan-list',
  templateUrl: './travelplan-list.component.html',
  styleUrls: ['./travelplan-list.component.css']
})
export class TravelplanListComponent implements OnInit {
  pageTitle = 'Product List';
  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredPlans = this.listFilter ? this.performFilter(this.listFilter) : this.plans;
  }

  filteredPlans: Plans[] = [];
  plans: Plans[] = [];

  performFilter(filterBy: string): Plans[] {
    filterBy = filterBy.toLocaleLowerCase();
    return 
    // this.products.filter((product: Plans) =>
    //   product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
