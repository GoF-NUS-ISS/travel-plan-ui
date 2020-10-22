import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {overAll} from './overallForm';

@Injectable()

export class FormCreationService{
    private formUrl='http://zuul.local:9527/myPlan/travelPlan'
    constructor(private http: HttpClient) { }
    public publish(form: overAll) {
        return this.http.post<overAll>(this.formUrl, form);
      }
}