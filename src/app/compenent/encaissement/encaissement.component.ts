import { Component, OnInit } from '@angular/core';
import { Compte, Client, banquier } from 'src/app/Models/Compte.Model';
import { CompteService } from 'src/app/services/compte.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Cheque } from 'src/app/Models/Cheque.Model';
import { ChequeService } from 'src/app/services/cheque.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { BankerService } from 'src/app/services/banker.service';


@Component({
  selector: 'app-encaissement',
  templateUrl: './encaissement.component.html',
  styleUrls: ['./encaissement.component.css']
})
export class EncaissementComponent implements OnInit {
  hide = true;
  currentAccount : Compte = null;
  NewCheque:any;
  client:any;
  currentBanker: banquier

  isEncaiss:boolean=false

  constructor(private compteServ : CompteService , private chequeService : ChequeService,
     private authenticationService : AuthenticationService,private router : Router,private clientService:ClientService
     ,private bankerService : BankerService) { }
  form=new FormGroup({
    numinternational : new FormControl('' , Validators.required), 
    montant:new FormControl('', Validators.required),
  });
  get Montant(){  
    return this.form.get('montant');  
  }  
  get Numinternational(){
    return this.form.get('numinternational');
  }
  ngOnInit(): void {
    if(this.authenticationService.isClientSelected() == false || this.authenticationService.isAccountSelected() == false){
      this.router.navigate(['selectClient']);
    }   
    this.currentAccount= new Compte();
    this.compteServ.getCompteBynumInternational(localStorage.getItem("idnouveaucompte")).subscribe(res=>{
      let compt : any =res;
      this.currentAccount=compt;
  });

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
  encaisserCheque(f){
    let cheque : Cheque = new Cheque();
    cheque.benificiaire=this.currentAccount.numinternational;
    cheque.numinternational = this.Numinternational.value;
    cheque.montant = this.Montant.value;
    cheque.bq= this.currentBanker;
    this.chequeService.encaisserCheque(cheque).subscribe(res =>{
      if(res == -1){
        alert("Numero international incorrect ");
      }
      else{
        alert("Cheque encaissé avec success ");
        console.log(res);
        
        this.NewCheque=res;
         this.isEncaiss=true
      }
    })
  }

  public downloadAsPDF() {
    return xepOnline.Formatter.Format('MyDiv',{render: 'download',
    embedLocalImages :'true'
});
}
}
