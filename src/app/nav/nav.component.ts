import { Component, OnInit } from '@angular/core';
import { FormCreationComponent } from '../Create-Plan/form-creation/form-creation.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router) { 
    
  }

  ngOnInit(): void {
    //this.router.navigate(['/FormCreation']);
  }
  

}
