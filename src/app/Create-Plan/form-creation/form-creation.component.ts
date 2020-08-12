import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../nav/nav.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-creation',
  templateUrl: './form-creation.component.html',
  styleUrls: ['./form-creation.component.css']
})
export class FormCreationComponent implements OnInit {
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['/planform']);
  }

}
