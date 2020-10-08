import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfileComponent } from '../user/profile/profile.component'
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { AuthService } from '../user/auth.service';
import { Plans } from './plans';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  usname:string;
    uname=this.auth.currentUserInfo().then(value=>{
      this.usname=value;
      return value;
    }
    )
    // private plansUrl = `http://localhost:9527/myPlan/travelPlan`;
    private plansUrl = `api/plan`;
    constructor(private http: HttpClient, private auth:AuthService){}

    getPlans(): Observable<Plans[]> {
      const url = `${this.plansUrl}`;
        return this.http.get<Plans[]>(url)
          .pipe(
            tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
          );
      }
    
      getPlan(id: string): Observable<Plans> {
        if (id === "0") {
          return of(this.initializePlan());
        }
       // const url = `${this.plansUrl}/name/${id}`;
        const url = `${this.plansUrl}/${id}`;
        return this.http.get<Plans>(url)
          .pipe(
            tap(data => console.log('getPlan: ' + JSON.stringify(data))),
            catchError(this.handleError)
          );
      }
      createPlan(plans: Plans): Observable<Plans> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 
        'Authorization': "Bearer "+ this.auth.getAccessToken() });
        plans.id = null;
        return this.http.post<Plans>(this.plansUrl, plans, { headers })
          .pipe(
            tap(data => console.log('createPlan: ' + JSON.stringify(data))),
            catchError(this.handleError)
          );
      }

      updatePlan(plans: Plans): Observable<Plans> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': "Bearer "+ this.auth.getAccessToken() });
        const url = `${this.plansUrl}/${plans.id}`;
        return this.http.put<Plans>(url, plans, { headers })
          .pipe(
            tap(() => console.log('updateProduct: ' + plans.id)),
            // Return the product on an update
            map(() => plans),
            catchError(this.handleError)
          );
      }
      searchPlan(plans: Plans): Observable<Plans> {
        return
      }
    
      
      private handleError(err) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
      }

      
    private initializePlan(): Plans {
        // Return an initialized object
        return {
          id: null,
          name: null,
          title: null,
          days: [{
            date: null,
            nodes: [
                {
                    type: null,
                    from:null,
                    to:null,
                    startOn:null,
                    returnDate:null,
                    transportMode:null,
                    cost:null,
                    location:null,
                    category:null,
                    timeStart:null,
                    timeEnd:null,
                    costActivity:null,
                    rating:null,
                    review:null
                }              
                //   {
                //     type:null,
                //     location:null,
                //     category:null,
                //     timeStart:null,
                //     timeEnd:null,
                //     cost:null,
                //     rating:null,
                //     review:null
                // }               
            ],
          }]
        };
      }
}