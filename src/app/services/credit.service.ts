import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credit } from '../Models/Credit.Model';
import { host } from './trasnaction.service';
import { infoCredit } from '../Models/InfoCredit.Model';

@Injectable({
  providedIn: 'root'
})
export class CreditService {

  constructor(private httpClient:HttpClient) { }
  public addCredit(idCompte : String, credit : Credit ) {
    return this.httpClient.post(host+"credit/demandecredit/"+idCompte,credit);
  }
  public getCreditsByClients(idCLient : String) : any {
    return this.httpClient.get(host+"credit/client/"+idCLient);
  }
  public payerCredit(idCredit : String) : any {
    return this.httpClient.put(host+"credit/payerrestecredit/"+idCredit,null);
  }
  public postCredit(cmp:infoCredit) {
    return this.httpClient.post(host+"infos/addinfos",cmp);
  }
}
