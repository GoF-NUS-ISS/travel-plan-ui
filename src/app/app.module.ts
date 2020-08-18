import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PlanListComponent } from './plans/plan-list/plan-list.component';
import { PlanListInputComponent } from './plans/plan-list-input/plan-list-input.component';
import { NavComponent } from './nav/nav.component';
import {PlanService} from './plans/Service/plans.service';
import { ToastrService } from './common/toastr.service';
import { FormCreationComponent } from './Create-Plan/form-creation/form-creation.component';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { UserModule } from './user/user.module';
import { AuthService } from './user/auth.service';
import {AgmCoreModule} from '@agm/core'
 

@NgModule({
  declarations: [
    AppComponent,
    PlanListComponent,
    PlanListInputComponent,
    NavComponent,
    routingComponents,
    HomepageComponent
    //FormCreationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCwpq3QYb89Myl6ViV0nsGqmbMVUzHkERY'
    })
    
  ],
  exports: [RouterModule],
  providers: 
  [
    PlanService, 
    ToastrService, 
    AuthService,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function checkDirtyState(component:FormCreationComponent){
  if(component.isDirty){
    return window.confirm('Do you want to cancel? The changes will not be saved')
  }
  else
  return true
}