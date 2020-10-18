import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Activity } from './activityForm';
import { Observable } from 'rxjs';

// @Injectable({
//     providedIn: 'root'
//   })

//   export class ActivityService {
  
//     private activityUrl = 'http://zuul.local:9527/myPlan/swagger-ui/index.html#/';
  
//     constructor(private http: HttpClient) { }
  
//     postActivity(): Observable<Activity> {
//       return this.http.post<Activity>(this.activityUrl);
//   }