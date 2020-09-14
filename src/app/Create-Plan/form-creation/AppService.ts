import { Injectable } from "@angular/core";
import {Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public travelFormChange = new BehaviorSubject<any>(null);

  triggerFormChange(data: any) {
    this.travelFormChange.next(data);
  }

  formChangeEvent() {
    return this.travelFormChange.asObservable();
  }
}