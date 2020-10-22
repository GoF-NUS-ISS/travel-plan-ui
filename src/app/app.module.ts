import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { NavComponent } from './nav/nav.component';
import { ToastrService } from './common/toastr.service';
import { FormCreationComponent } from './Create-Plan/form-creation/form-creation.component';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import {AgmCoreModule} from '@agm/core'
import{ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ActivityLegComponent } from './Create-Plan/form-creation/activity-leg/activity-leg.component';
import { TravelLegComponent } from './Create-Plan/form-creation/travel-leg/travel-leg.component';
import {AppService} from './Create-Plan/form-creation/AppService'
import {HttpClientModule} from '@angular/common/http'
import {FormCreationService} from './Create-Plan/form-creation/form.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { MaterialModule } from './material/material.module';
import { UserModule } from './user/user.module';
import { TravelplanListComponent } from './Plans/travelplan-list/travelplan-list.component';
import { TravelplanDisplayComponent } from './Plans/travelplan-display/travelplan-display.component';
import { TravelplanEditComponent } from './Plans/travelplan-edit/travelplan-edit.component';
import { TravelplanEditGuard } from './Plans/travelplan-edit/travelplan-edit.guard';
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { PlanData } from './Plans/plan-data';
import { TravelplanSearchComponent } from './Plans/travelplan-search/travelplan-search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    routingComponents,
    HomepageComponent,
    ActivityLegComponent,
    TravelLegComponent,
    TravelplanListComponent,
    TravelplanDisplayComponent,
    TravelplanEditComponent,
    TravelplanSearchComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    // InMemoryWebApiModule.forRoot(PlanData),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCwpq3QYb89Myl6ViV0nsGqmbMVUzHkERY'
    }),
    BrowserAnimationsModule,
    
  ],
  exports: [RouterModule, ReactiveFormsModule],
  providers: 
  [
    ToastrService, 
    FormCreationService,
    AppService,
    AngularFireModule,
    TravelplanEditGuard,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
export function checkDirtyState(component:FormCreationComponent){
  if(component.isDirty){
    return window.confirm('Do you want to cancel? The changes will not be saved')
  }
  else
  return true
}