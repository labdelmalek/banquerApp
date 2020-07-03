import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cheque } from '../Models/Cheque.Model';
import { host } from './trasnaction.service';

@Injectable({
  providedIn: 'root'
})
export class ChequeService {

  constructor(private httpClient:HttpClient ) { }
  public encaisserCheque(cheque : Cheque) {
    return this.httpClient.post(host+"cheques/encaissercompte",cheque);
  }
}
