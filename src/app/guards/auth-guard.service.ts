import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  

  constructor(private codeService:AuthenticationService, private router:Router) { }

  

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.codeService.isLoggedIn())
    return true;
    else{
      this.router.navigate(['login']);
      return false;
    }

  }
}
