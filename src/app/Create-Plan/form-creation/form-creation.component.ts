import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../nav/nav.component';
import { Router } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-form-creation',
  templateUrl: './form-creation.component.html',
  styleUrls: ['./form-creation.component.css']
})
export class FormCreationComponent implements OnInit {
  isDirty:boolean=true
  lat=51.678418
  lng=7.809007
  constructor(private router: Router) { }
  cancel() {
    this.router.navigate(['Home'])
  }
  onChoseLocation(event)
  {
    console.log(event);
  }
  ngOnInit(): void {
    //this.router.navigate(['/planform']); 
  }

}

