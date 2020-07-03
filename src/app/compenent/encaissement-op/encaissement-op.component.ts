import { Component, OnInit } from '@angular/core';
import { EncaissementEspece, Transaction } from 'src/app/Models/Transaction.Model';
import { CompteService } from 'src/app/services/compte.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';
import { BankerService } from 'src/app/services/banker.service';
import { banquier } from 'src/app/Models/Compte.Model';

@Component({
  selector: 'app-encaissement-op',
  templateUrl: './encaissement-op.component.html',
  styleUrls: ['./encaissement-op.component.css']
})
export class EncaissementOpComponent implements OnInit {
  idExist : Boolean = false;
  isEncaiss:boolean=false
  encaissement : EncaissementEspece ;
  cin:string
  montantTotale:Number
  num:string
  date:Date
  currentBanker: banquier
  constructor(private cmpteService : CompteService,private bankerService : BankerService) { }
  ngOnInit(): void {
    this.date=new Date();
    this.currentBanker= new banquier();
    this.bankerService.getCurrentBanker().subscribe((res : banquier)=>{
      this.currentBanker=res;
      console.log(this.currentBanker);
    })
  }

// create the form object.  
form = new FormGroup({  
  cin : new FormControl('' , Validators.required), 
  numinternational : new FormControl('' , Validators.required),
  montant : new FormControl('' , Validators.required)  
});  

get Cin(){  
  return this.form.get('cin');  
}  
get montant(){  
  return this.form.get('montant');  
}  
get numinternational(){  
  return this.form.get('numinternational');  
}  
sendEncaissement(encaissement)
{  
  this.encaissement = new EncaissementEspece();

    this.encaissement.benificiaire = this.Cin.value;  
    this.encaissement.montant = this.montant.value;  
    this.encaissement.numinternational = this.numinternational.value;  
  this.encaissement.bq=this.currentBanker;
        this.cmpteService.sendEncaissement(this.encaissement).subscribe(  
          response => {  
            if (response == -1){ 
              alert("solde insuffisant ")
            }
            else if (response == -2){
              alert("numinternational inexistant ")
            }
            else{
              alert("operation fait avec success");
              console.log(response);
              this.cin=this.encaissement.benificiaire;
              this.montantTotale=this.encaissement.montant;
              this.num=this.encaissement.numinternational;

              
              this.isEncaiss=true
            }
          });  
    

    
    
}  
public downloadAsPDF() {
  return xepOnline.Formatter.Format('MyDiv',{render: 'download',
  embedLocalImages :'true'
});
}
}