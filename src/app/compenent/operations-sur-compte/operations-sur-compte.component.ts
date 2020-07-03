import { Component, OnInit } from '@angular/core';
import { Compte, Client } from 'src/app/Models/Compte.Model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompteService } from 'src/app/services/compte.service';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { isUndefined } from 'util';
import { Transaction } from 'src/app/Models/Transaction.Model';
import { CarteB } from 'src/app/Models/Carteb.Model';
import { SubscriptionLike } from 'rxjs';
import { TrasnactionService } from 'src/app/services/trasnaction.service';
import { CartbService } from 'src/app/services/cartb.service';

@Component({
  selector: 'app-operations-sur-compte',
  templateUrl: './operations-sur-compte.component.html',
  styleUrls: ['./operations-sur-compte.component.css']
})
export class OperationsSurCompteComponent implements OnInit {

  accounts : Array<Compte>;
  typecompte;
  client : Client ;
  selected : Boolean = false;
  Epargne : boolean = true;
  transaction : Array<Transaction>;
  carte : CarteB = null;
  containsCarte : boolean = false;
  owner : Client ;
  currentAccount : Compte = null;
  currentAccountnumber : string = "";
  currentAccountnumber1:string="";
  subscriptions: SubscriptionLike[] = [];


  constructor( private  _authservice :AuthenticationService ,
    private compteService : CompteService, private router : Router,
    private clientService : ClientService,
    private tranService : TrasnactionService,
    private cbancaireService : CartbService) { }

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
    }
    this.accounts = new Array<Compte>();
    
    if(this._authservice.isLoggedIn()==true){
    this.compteService.Getcheque(localStorage.getItem("idclient"))
    .subscribe(data=>{
      if(data){
      for(let c of data){
        if(!c.is_suspended)
        this.accounts.push(c);
      }
    }
    this.compteService.Getepargne(localStorage.getItem("idclient"))
  .subscribe(data=>{
    if(data){
    for(let c of data){
      if(!c.is_suspended)
      this.accounts.push(c);
    }
  }
        });
    
    },err=>{ 
      console.log(err);
    });
  
   }
  }
  oncompte(comptee : Compte){
    this.typecompte= false;

   console.log("called")
    this.currentAccount=comptee;
    this.selected=true;
   this.containsCarte=false;

   this.transaction= new Array<Transaction>();
   this.subscriptions.push(this.tranService.Gettransactionreceiver(this.currentAccount.id)
    .subscribe(response=>{
      if(response != null){
      for(let t of response){
        t.is_sender=false;
        this.transaction.push(t); 
      }
      
      }
     }));
     this.subscriptions.push(this.tranService.Gettransactionsender(this.currentAccount.id)
      .subscribe(response=>{
        if(response != null){
        for(let t of response){
          t.is_sender=true;
          this.transaction.push(t);
        }
        this.transaction=this.transaction.reverse();
      }
      }));
      if(comptee.taux == undefined){
        this.typecompte= true;
        console.log("requests");
        this.subscriptions.push(this.cbancaireService.getCartesOfAccount(comptee.id).subscribe(response =>{
          if (response != -1 && response != -2){
            console.log(response);

      for (let i of response){
        if (i.status == true || i.status == false ){
          this.carte = new CarteB();
          this.carte=i;
            this.carte.compte=this.currentAccount;
        this.clientService.getClient().subscribe(resp =>{
          this.owner=new Client();
          this.owner=resp;
          this.containsCarte=true;

          console.log(this.owner);

        });
          break;
        }
        this.containsCarte=false;
      }}
    }));}
   localStorage.setItem("idnouveaucompte",this.currentAccount.numinternational);
   this.currentAccountnumber1="le Compte selectionné  :";
    this.currentAccountnumber=this.currentAccount.numinternational;
  }
  oublierclientId(){
    this._authservice.forgetClientId();
    window.location.reload();
  }
  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
  }
  fermerCompte(){
    this.compteService.fermerCompte(this.currentAccount.id).subscribe(res=>{
      if(res == -1){
        alert("compte avec un credit, Veuillez régler votre situation avec la banque")
      }
      else if(res == -2){
        alert("compte avec balance superieur à 1, Veuillez retirer ou transférer votre solde vers un autre compte")
      }
      else if(res == -3){
        alert("compte introuvable ou fermé")
      }
      else{
        alert("compte fermé avec success");
        console.log(res);
        location.reload();
      }
    })
  }
}
