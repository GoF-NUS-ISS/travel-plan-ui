import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
//import { PlanListComponent } from './plans/plan-list/plan-list.component';
//import { PlanListInputComponent } from './plans/plan-list-input/plan-list-input.component';
import { NavComponent } from './nav/nav.component';
//import {PlanService} from './plans/Service/plans.service';
//import { ToastrService } from './common/toastr.service';
//import { FormCreationComponent } from './Create-Plan/form-creation/form-creation.component';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule, routingComponents } from './app-routing.module';
 

@NgModule({
  declarations: [
    AppComponent,
    //PlanListComponent,
    //PlanListInputComponent,
    NavComponent,
    routingComponents
    //FormCreationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  exports: [RouterModule],
  //providers: [PlanService, ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
