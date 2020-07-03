import { Component, OnInit } from '@angular/core';
import { Compte, Client, banquier } from 'src/app/Models/Compte.Model';
import { CompteService } from 'src/app/services/compte.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Transaction } from 'src/app/Models/Transaction.Model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { BankerService } from 'src/app/services/banker.service';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.component.html',
  styleUrls: ['./retrait.component.css']
})
export class RetraitComponent implements OnInit {

  currentAccount : Compte = null; 
  Success:boolean=false;
  date:Date;
  client:any;
  num:string
  currentBanker: banquier


  constructor(private compteServ : CompteService,
     private authenticationService : AuthenticationService,
      private router : Router,private clientService:ClientService,
      private bankerService : BankerService) { }
  form=new FormGroup({
    numinternational : new FormControl('' , Validators.required), 
    montant:new FormControl('', Validators.required),
  });
  get Montant(){  
    return this.form.get('montant');  
  }  
  
 
  ngOnInit(): void {
    if(this.authenticationService.isClientSelected() == false || this.authenticationService.isAccountSelected() == false){
      this.router.navigate(['selectClient']);
    }     this.currentAccount= new Compte(); 
    this.compteServ.getCompteBynumInternational(localStorage.getItem("idnouveaucompte")).subscribe(res=>{
      let compt : any =res;
      this.currentAccount=compt;
    
  });
  this.num=localStorage.getItem("idnouveaucompte");

  this.clientService.getClient().subscribe(res=>{
    this.client=new Client();
    
     this.client=res;
   })

    this.currentBanker= new banquier();
    this.bankerService.getCurrentBanker().subscribe((res : banquier)=>{
      this.currentBanker=res;
      console.log(this.currentBanker);
    })
  }
  retrait(f){
    this.Success=false;

    let transaction : Transaction = new Transaction();
    transaction.somme = this.Montant.value;
    transaction.bq= this.currentBanker;
    this.compteServ.retrait(this.currentAccount.id,transaction).subscribe(res=>{
      if(res == -1 ){
        alert("compte introuvable ou solde insuffisant");
      }
      else if (res == 1){
        alert("Retrait effectué avec success");
        this.Success=true;
        this.date=new Date();


      }
    })
  }
  public downloadAsPDF() {
    return xepOnline.Formatter.Format('MyDiv',{render: 'download',
    embedLocalImages :'true'
});
}
}
