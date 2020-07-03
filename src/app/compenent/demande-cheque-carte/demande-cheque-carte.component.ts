import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { CompteService } from 'src/app/services/compte.service';
import { CarteB } from 'src/app/Models/Carteb.Model';
import { Requestcb } from 'src/app/Models/Requestcb';
import { Router } from '@angular/router';
import { requestcc } from 'src/app/Models/requestcc';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Client } from 'src/app/Models/Compte.Model';

@Component({
  selector: 'app-demande-cheque-carte',
  templateUrl: './demande-cheque-carte.component.html',
  styleUrls: ['./demande-cheque-carte.component.css']
})
export class DemandeChequeCarteComponent implements OnInit {


  requestcc:any
  requestcb: any
  ccheque:boolean=false;
  compteChoisi:string=""
  client:any
  
  cbancaire:boolean=false;
  constructor( private compteService : CompteService,private router:Router, private authenticationService : AuthenticationService
    ,private clientService:ClientService) { }
  form = new FormGroup({  
    typecarte : new FormControl('' , Validators.required), 
  });  
  
  get Typecarte(){  
    return this.form.get('typecarte');  
  }  
  ngOnInit(): void {
    if(this.authenticationService.isClientSelected() == false || this.authenticationService.isAccountSelected() == false){
      this.router.navigate(['selectClient']);
    }  

    this.compteChoisi=localStorage.getItem('idnouveaucompte');
    this.clientService.getClient().subscribe(res=>{
     this.client=new Client();
     
      this.client=res;
    
     // console.log(res);
    })
  }
  addcarte(newcarte){
    let carte = new Requestcb();
    carte.cardType=this.Typecarte.value;
    if(this.Typecarte.value!=""){
    this.compteService.ajoutercarteBancaire(carte).subscribe(res=>{
      if (res == -1 ){
        alert("Ce compte contient déjà une carte bancaire, ou vous une demande en cours de traitement")
      }
      else{
        alert("demande carte ajoutée avec success");
        console.log(res);
        this.requestcb=new Requestcb();
        this.requestcb=res;
        this.cbancaire=true;

      }
     
    });}
  else
{ 
  alert("selectionner un type de carte");
  }  
}
  addcheque(){
    this.compteService.ajoutercarnetCheque().subscribe(res=>{
      if (res == -1 ){
        alert("ou vous avez une demande en cours de traitement")
      }
      else{
        alert("demande carnet de chèques ajoutée avec success");
        console.log(res);
        this.requestcc=new requestcc();
        this.requestcc=res;
        this.ccheque=true;

      }

    })

  }


  public downloadAsPDF1() {
    return xepOnline.Formatter.Format('MyDiv',{render: 'download'});
  }

  public downloadAsPDF() {
    return xepOnline.Formatter.Format('MyDiv1',{render: 'download'});
  }
}
