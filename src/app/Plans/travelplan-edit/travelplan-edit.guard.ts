import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { TravelplanEditComponent } from './travelplan-edit.component';

@Injectable({
  providedIn: 'root'
})
export class TravelplanEditGuard implements CanDeactivate<TravelplanEditComponent> {
  canDeactivate(component: TravelplanEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.form.dirty) {
      const title = component.form.get('title').value || 'New Product';
      return confirm(`Navigate away and lose all changes to ${title}?`);
    }
    return true;
  }
}
