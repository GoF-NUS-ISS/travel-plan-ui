import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {overAll} from './overallForm';

@Injectable()

export class FormCreationService{
    private formUrl='http://localhost:9527/myPlan/swagger-ui/index.html#/travel-plan-controller/addPlanUsingPOST'
    constructor(private http: HttpClient) { }
    public publish(form: overAll) {
        return this.http.post<overAll>(this.formUrl, form);
      }
}