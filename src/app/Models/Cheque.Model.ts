import { Compte, banquier } from './Compte.Model';

export class Cheque{
    id : number  ;
    numcheque  : string  ;
	benificiaire : string ;
	date_encaissement : Date ;
	montant : number ;
	numinternational : string ;
	status  : number ;
    typeencaissement : string ;
	compte : Compte;
	bq : banquier
}