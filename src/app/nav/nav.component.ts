import { Component, OnInit } from '@angular/core';
import { FormCreationComponent } from '../Create-Plan/form-creation/form-creation.component';
import { Router } from '@angular/router';
import { AuthService } from '../user/auth.service'
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService) { 
    
  }

  ngOnInit(): void {
    
  }

}
