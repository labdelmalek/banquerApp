import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Compte, Client } from 'src/app/Models/Compte.Model';
import { CompteService } from 'src/app/services/compte.service';
import { CreditService } from 'src/app/services/credit.service';
import { Credit } from 'src/app/Models/Credit.Model';
import { Agence } from 'src/app/Models/agence';
import { ClientService } from 'src/app/services/client.service';
import { infoCredit } from 'src/app/Models/InfoCredit.Model';
import { AgenceService } from 'src/app/services/agence.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

interface Coompte {
  name: string;
}
interface emply {
  name: string;
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-demande-credit',
  templateUrl: './demande-credit.component.html',
  styleUrls: ['./demande-credit.component.css']
})

export class DemandeCreditComponent implements OnInit {
  taux = new FormControl(); 
  numcompte = new FormControl();
  mois = new FormControl();
  currentAccount : Compte= new Compte();
  tauxpourcent : number = 5;
  credit : Credit;
  cred : Credit;

  selectFormControl = new FormControl('', Validators.required);
  compteControl = new FormControl('', Validators.required);
  agence=new Agence();
  currentClient : Client = new Client();

  comptes: Coompte[] = [
    {name: 'Consomation'},
    {name: 'Immobilier' },
  ]; 
  emplys: emply[] = [
    {name: 'Salarie'},
    {name: 'retraite' },
  ];
  form=new FormGroup({
    typecredit : new FormControl('' , Validators.required), 
    montant:new FormControl('', Validators.required),
    mois:new FormControl('', Validators.required),
    nom:new FormControl('' , Validators.required), 
    prenom:new FormControl('' , Validators.required), 
    capitale:new FormControl('' , Validators.required),  
    cin:new FormControl('' , Validators.required), 
    salaire:new FormControl('',Validators.required),
    typesal:new FormControl('',Validators.required) 
  });
  get Nom(){  
    return this.form.get('nom');  
  } 
  get Prenom(){  
    return this.form.get('prenom');  
  } 
  get Capitale(){  
    return this.form.get('capitale');  
  } 
  get Cin(){
   return  this.form.get('cin');
  }
  get Typesal(){
    return this.form.get('typesal');
  }
  get Salaire(){
    return this.form.get('salaire');
  }
  get Typecredit(){  
    return this.form.get('typecredit');  
  }  
  get Mois(){
    return this.form.get('mois');
  }
  get Montant(){
    return this.form.get('montant');
  }
  matcher = new MyErrorStateMatcher();
  constructor(private compteServ : CompteService, 
    private creditService : CreditService,
    private clientService : ClientService
    ,private agenceService : AgenceService,
    private router : Router,
    private authenticationService : AuthenticationService) { }

  ngOnInit(): void {
    if(this.authenticationService.isClientSelected() == false || this.authenticationService.isAccountSelected() == false){
      this.router.navigate(['selectClient']);
    } 
    else{
    this.currentClient = new Client();
    this.credit = new Credit();
    this.currentAccount= new Compte();
    this.compteServ.getCompteBynumInternational(localStorage.getItem("idnouveaucompte")).subscribe(res=>{
      let compt : any =res;
      this.currentAccount=compt;
    this.clientService.getClientById(localStorage.getItem("idclient")).subscribe((res : Client)=>{
      this.currentClient=res;
      console.log(this.currentClient);
    })
    this.agenceService.getAgenceByBanker(localStorage.getItem("idbq")).subscribe(res=>{
      this.agence=res;
    })
    
    
  });}
}
  addCredit(f){
    if(this.Typecredit.value['name'] == 'Consomation')
    { 
      this.tauxpourcent=7.5;
    }
    if(this.Typecredit.value['name'] == 'Immobilier')
    { 
      this.tauxpourcent=5;
    }
      this.credit.somme=this.Montant.value;
      this.credit.nbmois=this.Mois.value;
      this.credit.taux=this.tauxpourcent;
      console.log("nbre de mois")
      console.log(this.credit.nbmois);

    this.creditService.addCredit(this.currentAccount.id.toString(),this.credit).subscribe((res)=>{
      if(res == -1){
        alert("Compte Inexistant");
      }
      else{
      let c : any = res;
      this.cred = new Credit();
      this.cred=c;
      console.log(this.cred);
      this.Inscricre();
      }
    });
  }
  Inscricre(){
    let  data=new infoCredit();
    data.typecredit=this.Typecredit.value["name"];
    data.typeemployee=this.Typesal.value["name"];
     data.cin=this.currentClient.cin;
    data.nom=this.currentClient.lastName;
   data.prenom=this.currentClient.firstName;
     data.salaire=this.Salaire.value;
    data.sommeclient=this.Capitale.value;
     data.idcredit=this.cred.id;
     data.idagence=this.agence.id;
    data.mensualite=this.cred.mensualite;
     data.montantcredit=this.cred.somme;
     data.nombremois=this.cred.nbmois;
    this.creditService.postCredit(data).subscribe(res=>{
      console.log("infocredit")
      console.log(res);
      alert("Votre demande est en cours de traitement ");
    })
  }
}
