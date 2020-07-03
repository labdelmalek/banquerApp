import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TrasnactionService } from 'src/app/services/trasnaction.service';
import { CompteService } from 'src/app/services/compte.service';
import { Compte, Client, banquier } from 'src/app/Models/Compte.Model';
import { ClientService } from 'src/app/services/client.service';
import { BankerService } from 'src/app/services/banker.service';
import { Transaction } from 'src/app/Models/Transaction.Model';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {

  constructor(private trans : TrasnactionService,private comService:CompteService,
    private clientService:ClientService
    ,private bankerService : BankerService) { }

    @Input() currentAccount : Compte ;
    suffisant:boolean=true;
    idR:number;
    idS:any;
    client:any;
    Success : Boolean = false;
    accountnotfound : boolean = false;
    balance : number = 0;
    currentBanker: banquier

    montant:number
    numero:string
    numC:string
    date:Date

  form=new FormGroup({
    num:new FormControl('',[Validators.maxLength(24),Validators.minLength(1),Validators.pattern('^[0-9]+$')]),
    somme:new FormControl('',[Validators.maxLength(10),Validators.minLength(1),Validators.pattern('^[0-9]+$'),Validators.min(1)])
  });
  get getsom(){
    return this.form.get('somme');
  }
  get getnum(){
    return this.form.get('num');
  }
  ngOnInit(): void {

    this.clientService.getClient().subscribe(res=>{
      this.client=new Client();
      
       this.client=res;
     
      // console.log(res);
     })
     this.currentBanker= new banquier();
    this.bankerService.getCurrentBanker().subscribe((res : banquier)=>{
      this.currentBanker=res;
      console.log(this.currentBanker);
    })
  }
  AddTrans(data:any){

    console.log(this.currentAccount.id);
    if(data.somme > this.currentAccount.balance)
    {this.suffisant=false;
    alert("Solde insuffisant");
    }
  else{
      this.comService.getCompteBynumInternational(data.num).
      subscribe((res:any)=>{
        if(res != -1){
        this.idR=res['id'];
        this.idS = this.currentAccount.id;
        console.log("some = ");
        console.log(data.somme);
        let tr : Transaction = new Transaction();
        tr.somme=data.somme;
        tr.bq=this.currentBanker;
        this.trans.fairetransaction(this.idR,this.idS,tr)
        .subscribe((res:any)=>{
          if(res==1){
            this.montant=data.somme
            this.numero=data.num
            this.numC=localStorage.getItem('idnouveaucompte')
            this.date=new Date();
            this.Success=true;


            }
          else{
            console.log("None");
            alert("probleme");
          }
        },err=>{
          console.log(err.body);
          alert(err.body);
        }  
          )
    }
  else
  { 
      this.accountnotfound=true;
      alert("Compte introuvable");
  }
  },err=>{
            alert(err.body);
          });
        }
            }
      getBalanceAcc(solde){
        this.balance=solde;
      }


      public downloadAsPDF() {
        return xepOnline.Formatter.Format('MyDiv',{render: 'download',
        embedLocalImages :'true'
    });
    }
    }
