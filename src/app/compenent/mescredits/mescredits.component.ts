import { Component, OnInit } from '@angular/core';
import { Credit } from 'src/app/Models/Credit.Model';
import { Client, Compte } from 'src/app/Models/Compte.Model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompteService } from 'src/app/services/compte.service';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { isUndefined } from 'util';
import { CreditService } from 'src/app/services/credit.service';

@Component({
  selector: 'app-mescredits',
  templateUrl: './mescredits.component.html',
  styleUrls: ['./mescredits.component.css']
})
export class MescreditsComponent implements OnInit {
  credits : Array<Credit>;
  typecompte;
  client : Client ;
  selected : Boolean = false;
  currentCredit : Credit = null;
  currentAccountnumber : string = "";
  constructor( private  _authservice :AuthenticationService ,private compteService : CompteService, private router : Router,
    private clientService : ClientService, private creditService : CreditService) { }

  ngOnInit(): void {
    this.client= new Client();
    if(this._authservice.isClientSelected() == false){
      this.router.navigate(['selectClient']);
    }
    else{
      this.clientService.getClientById(localStorage.getItem('idclient')).subscribe(res=>{
        let cl : any = res;
        this.client=cl;
        console.log(this.client);
      })
    
    this.credits = new Array<Credit>();
    
    if(this._authservice.isLoggedIn()==true ){
      this.creditService.getCreditsByClients(localStorage.getItem('idclient')).subscribe(res =>{
        if (res == -1){
          console.log("Client non selectionné");
        }
        else {
          for (let f  of res){
            this.credits.push(f);
          }
        }
        console.log(this.credits);
      })
    }
  }
  }
  oncompte(credit : Credit){
    console.log("called")
    this.selected=true;
   this.currentCredit=credit;
  //  localStorage.setItem("idnouveaucompte",this.currentAccount.numinternational);
  //credit c'est le compte lié aà currentCredit
    this.currentAccountnumber="Compte  : " +this.currentCredit.credit.numinternational;
  }
  oublierclientId(){
    this._authservice.forgetClientId();
    window.location.reload();
  }
  payerCredit(){
    this.creditService.payerCredit(this.currentCredit.id.toString()).subscribe(res=>{
      if(res == -2){
        alert("solde insuffisant");
      }
      else if(res == -1){
        alert("credit non existant")
      }
      else{
        alert("credit payé avec success")
        window.location.reload();
      }
    })
  }

}
