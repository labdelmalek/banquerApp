import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-sous-navbar',
  templateUrl: './sous-navbar.component.html',
  styleUrls: ['./sous-navbar.component.css']
})
export class SousNavbarComponent implements OnInit {
@Input() typecompte;
  constructor(private route:ActivatedRoute,private router:Router,private  _authservice :AuthenticationService) { }

  ngOnInit(): void {
    // this.router.navigate(['demandeCh'],{relativeTo:this.route});
  }


  hasRoute(route: string) {
    return this.router.url.includes(route);
  }


  oublierclientId(){
    this._authservice.forgetClientId();
    window.location.reload();
  }


}
