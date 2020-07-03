import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction, EncaissementEspece } from '../Models/Transaction.Model';
import { Compte } from '../Models/Compte.Model';
import { CarteB } from '../Models/Carteb.Model';
import { Requestcb } from '../Models/Requestcb';
import { Observable } from 'rxjs';
import { host } from './trasnaction.service';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  constructor(private httpClient:HttpClient ) { } 
  public versement(numinternational : String, tr : Transaction) {
    return this.httpClient.put(host+"compte/versement/"+numinternational,tr);
  }
  public retrait(id : number, tr : Transaction) {
    return this.httpClient.put(host+"compte/retrait/"+id,tr);
  }
  public getCompteBynumInternational(numinternational : String) {
    return this.httpClient.get(host+"compte/numinternational/"+numinternational);
  }
  public sendEncaissement(demande : EncaissementEspece) {
    return this.httpClient.post(host+"cheques/encaisserespece",demande);
  }
  public ajouterEpargne(cmpt : Compte) {
    
    return this.httpClient.post(host+"epargne/addCompte/"+localStorage.getItem("idclient")+"/"+localStorage.getItem("idag"),cmpt);
  }
  public ajouterCheque(cmpt : Compte) {
    return this.httpClient.post(host+"cheque/addCompte/"+localStorage.getItem("idclient")+"/"+localStorage.getItem("idag"),cmpt);
  }
  public ajoutercarteBancaire(cmpt : Requestcb) {
    return this.httpClient.post(host+"requestCartCredit/saveWithAccount/"+localStorage.getItem("idnouveaucompte"),cmpt);
  }
  public ajoutercarnetCheque() {
    return this.httpClient.put(host+"requestCC/saveWithAccount/"+localStorage.getItem("idnouveaucompte"),null);
    }
    public  Getcheque(vari): Observable<Array<Compte>>{
      return this.httpClient.get<Array<Compte>>(host+"Client/"+vari+"/chequecomptes");
    }
    public Getepargne(vari): Observable<Array<Compte>>{
      return this.httpClient.get<Array<Compte>>(host+"Client/"+vari+"/epargnecomptes");
    }
    public fermerCompte(idCompte : number) {
      return this.httpClient.put(host+"compte/fermercompte/"+idCompte,null);
    }
}