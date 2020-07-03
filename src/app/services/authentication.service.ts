import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginCredentils } from '../Models/LoginCredentials.Model';
import { Observable } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import { refreshTokenRequest } from '../Models/RefreshTokenRequest.Model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _http: HttpClient,private router : Router) { }
  baseUrl :string= "https://bank-app-api.herokuapp.com/";

   login(clientDetail : LoginCredentils) : Observable<any>
  {
      let url = this.baseUrl + "authenticateBanquier";
      return this._http.post(url, clientDetail,{observe: 'response'});
  }
  isClientSelected(){
    let client = localStorage.getItem('idclient');
    console.log(client);
    if(client == "" || client == undefined){
      console.log("false");
            return false
    }
    else{
      return true;
    }
  }
  isAccountSelected(){
    let client = localStorage.getItem('idnouveaucompte');
    console.log(client);
    if(client == "" || client == undefined){
      console.log("false");
            return false
    }
    else{
      return true;
    }
  }
  forgetClientId(){
    localStorage.removeItem('idclient');
  }
  Logout()
  {
    // Remove the token from the localStorage.
    let iduser = localStorage.getItem("idbq");  
    let url = this.baseUrl + "logoutbq/";
    this._http.get(url+iduser).subscribe(res=>{
      console.log(res);
      // window.location.reload();
    })
    window.localStorage.clear();
    //this.router.navigate(['login']);
  }
  refreshToken() {
    let refresh : refreshTokenRequest = new refreshTokenRequest();
    refresh.refreshToken= localStorage.getItem("REFRESH_TOKEN");  
    refresh.userId= localStorage.getItem("idbq");  
      return this._http.post<any>(this.baseUrl+'renewBanquier', refresh
      ).pipe(tap((tokens) => {
        console.log("test");
        console.log(tokens.refreshToken)
        if(tokens.refreshToken !=undefined){
            localStorage.setItem("token" , tokens.refreshToken);
          }
          else{
            this.Logout();
          }
          location.reload();  
    }));
  }

  isLoggedIn() {
    // create an instance of JwtHelper class.
    let jwtHelper = new JwtHelperService();
    // get the token from the localStorage as we have to work on this token.
    let token = localStorage.getItem('token');
    // check whether if token have something or it is null.
    if(!token)
    {
      return false;
    }
    else
    return true;
    // else
    // {
    //  // let expirationDate = jwtHelper.getTokenExpirationDate(token);

    //   // check whether the token is expired or not by calling isTokenExpired() method of JwtHelper class.
    //   let isExpired = jwtHelper.isTokenExpired(token);
    //   console.log("is expired")
    //   console.log(isExpired)
      
    //   return !isExpired;
    // }
    // }
  }
}
