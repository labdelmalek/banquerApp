import { Agence } from './agence';
import { Credit } from './Credit.Model';

export class infoCredit{
    id : number;
	cin : string;
	nom : string; 
	prenom : string;
	sommeclient : number;
    salaire : number;
    mensualite:number;
    montantcredit:number;
    nombremois:number;
    typecredit:string;
    typeemployee:string;
    idagence : number;
    idcredit : number;
}