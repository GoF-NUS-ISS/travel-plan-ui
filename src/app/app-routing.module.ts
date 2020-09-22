import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormCreationComponent } from './Create-Plan/form-creation/form-creation.component';
import { TravelplanListComponent } from './Plans/travelplan-list/travelplan-list.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './user/auth.guard';
import { UnauthGuard } from './user/unauth.guard';

const routes: Routes = [
    {path:'FormCreation', component: FormCreationComponent, canActivate: [AuthGuard], canDeactivate: ['canDeactivateCreateEvent']},
    {path:'PublishedPlans', component: TravelplanListComponent, canActivate: [AuthGuard]},
    {path:'Home', component: HomepageComponent, canActivate: [AuthGuard]},
    {path:'', redirectTo: '/Home', pathMatch: 'full'}, // redirect to the Homepage directly
    { path: 'user', loadChildren: './user/user.module#UserModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[FormCreationComponent, HomepageComponent]
