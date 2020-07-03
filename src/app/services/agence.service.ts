import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { host } from './trasnaction.service';
import { Agence } from '../Models/agence';
@Injectable({
  providedIn: 'root'
})
export class AgenceService {

  constructor(private httpClient:HttpClient) { }

  public getAgenceByBanker(id) {
    return this.httpClient.get<Agence>(host+"api/agencies/banquiers/banquier/"+id);
  }
}
