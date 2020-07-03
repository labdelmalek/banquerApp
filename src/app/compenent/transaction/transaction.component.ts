import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/Models/Transaction.Model';
import { Compte, Client } from 'src/app/Models/Compte.Model';
import { CompteService } from 'src/app/services/compte.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TrasnactionService } from 'src/app/services/trasnaction.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  compte : Compte = new Compte();
  id:any ;
  Cheques : Array<Compte> = new Array();
  Epargnes : Array<Compte> = new Array();
  Epargne : boolean = true;
  selected : Boolean = false;
  currentAccount : Compte = new Compte();
  transactionCmp : Array<Transaction>= new Array<Transaction>() ;
  transactionssCmp : Array<Transaction> = new Array<Transaction>();
  containsCarte : boolean = false; 

  constructor(private compteServ : CompteService, private _clientService : ClientService
    , private _authSerivce : AuthenticationService
    ,private _router :Router,
    private tranService : TrasnactionService) { }

  ngOnInit(): void {
    if(this._authSerivce.isClientSelected() == false || this._authSerivce.isAccountSelected() == false){
      this._router.navigate(['selectClient']);
     
    } 
    else{
    this.currentAccount= new Compte();
    this.compteServ.getCompteBynumInternational(localStorage.getItem("idnouveaucompte")).subscribe(res=>{
      console.log(res);
      let compt : any =res;
      this.currentAccount=compt;
      this.transactionssCmp = new Array<Transaction>();
    this.transactionCmp = new Array<Transaction>();
    this.tranService.getAllTransactions(this.currentAccount.id)
    .subscribe(response=>{
      if(response != null){
      for(let t of response){
        if (t.sender != null ){
          if (t.sender.id == this.currentAccount.id){
          t.is_sender=true;
        }
        else {
          t.is_sender = false;
        }
        }
        else{
          t.is_sender=false;
        }
       if(t.type == "transaction" ){
         this.transactionCmp.push(t);
       }
       else{
         this.transactionssCmp.push(t);
       }
        
      }
      this.transactionCmp.sort((a, b) => (a.date > b.date ? -1 : 1));
      this.transactionssCmp.sort((a, b) => (a.date > b.date ? -1 : 1));
      console.log("all compte")
      console.log(this.transactionCmp);
      console.log("all ss compte")
      console.log(this.transactionssCmp);
      }
     });
    });
    
  }
  }
  

}
