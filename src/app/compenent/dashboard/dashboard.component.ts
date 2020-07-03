import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private authentication : AuthenticationService,  private router : Router) { }

  ngOnInit(): void {
    if((this.authentication.isLoggedIn()) )  
    {  
              this.router.navigate(['dashboard']);  
    }  
    else  
    {  
          this.router.navigate(['login']);  
    }  
  }

}
