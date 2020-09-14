import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormCreationComponent } from './Create-Plan/form-creation/form-creation.component';
// import { PlanListComponent } from './plans/plan-list/plan-list.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
    {path:'FormCreation', component: FormCreationComponent, canDeactivate: ['canDeactivateCreateEvent']},
    // {path:'PublishedPlans', component: PlanListComponent},
    {path:'Home', component: HomepageComponent},
    {path:'', redirectTo: '/Home', pathMatch: 'full'}, // redirect to the Homepage directly
    { path: 'user', loadChildren: './user/user.module#UserModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[FormCreationComponent, HomepageComponent]
