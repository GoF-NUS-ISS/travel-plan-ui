import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormCreationComponent } from './Create-Plan/form-creation/form-creation.component';
//import { PlanListComponent } from './plans/plan-list/plan-list.component';

const routes: Routes = [
    {path:'FormCreation', component: FormCreationComponent}
    //{path:'PublishedPlans', component: PlanListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[FormCreationComponent]//, PlanListComponent]
