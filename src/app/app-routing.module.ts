import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TravelplanListComponent } from './Plans/travelplan-list/travelplan-list.component';
import { TravelplanDisplayComponent } from './Plans/travelplan-display/travelplan-display.component';
import { TravelplanEditComponent } from './Plans/travelplan-edit/travelplan-edit.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './user/auth.guard';
import {TravelplanSearchComponent} from './Plans/travelplan-search/travelplan-search.component'
import { UnauthGuard } from './user/unauth.guard';
import { TravelplanEditGuard } from './Plans/travelplan-edit/travelplan-edit.guard';

const routes: Routes = [
  //, canDeactivate: ['TravelplanEditGuard']
    {path:'plans/:id/edit', component: TravelplanEditComponent, canActivate: [AuthGuard]},
    {path:'plans', component: TravelplanListComponent, canActivate: [AuthGuard]},
    { path: 'plans/:id', component: TravelplanDisplayComponent, canActivate: [AuthGuard]},
    {path:'Home', component: HomepageComponent, canActivate: [AuthGuard]},
    {path:'search', component: TravelplanSearchComponent, canActivate: [AuthGuard]},
    {path:'', redirectTo: '/user/profile', pathMatch: 'full'}, // redirect to the Homepage directly
    { path: 'user', loadChildren: './user/user.module#UserModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[HomepageComponent]
