import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../Models/Compte.Model';
import { host } from './trasnaction.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  Baseurl : string = "https://bank-app-api.herokuapp.com/Client/";

  constructor(private httpClient:HttpClient ) { }
  public ajouterClient(client : Client) {
    return this.httpClient.post(host+"Client/addClient",client);
  }
  public getClientByCIN(cin : string) {
    return this.httpClient.get(host+"Client/cin/"+cin);
  }
  public getClientById(id : string) {
    return this.httpClient.get(host+"Client/"+id);
  }
  getClient() : Observable<Client>{
    let id = localStorage.getItem("idclient");
    return this.httpClient.get<Client>(this.Baseurl+id);
  }
  updateClient(client : Client){
    let id = localStorage.getItem("idclient");
    return this.httpClient.put(this.Baseurl+"updateClientCredentials/"+id,client);
  }
  
  

}
