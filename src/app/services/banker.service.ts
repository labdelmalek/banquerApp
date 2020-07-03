import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { banquier } from '../Models/Compte.Model';

@Injectable({
  providedIn: 'root'
})
export class BankerService {

  constructor(private _http: HttpClient,private router : Router) { }
  baseUrl :string= "https://bank-app-api.herokuapp.com/";

   getCurrentBanker()  : Observable<banquier>
  {
      let url = this.baseUrl + "banker/bankers/"+localStorage.getItem("idbq");
      return this._http.get<banquier>(url);
  }
}
