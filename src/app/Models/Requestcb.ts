import { Compte, banquier } from './Compte.Model';

export class Requestcb{
   idRequest:number;
    dateRequest:Date;
     closeRequest:boolean;
     numCompte:string;
     cheque : Compte;
     cardType : string;
     bq : banquier;
}
