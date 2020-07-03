import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Transaction } from 'src/app/Models/Transaction.Model';
import { CompteService } from 'src/app/services/compte.service';
import { banquier } from 'src/app/Models/Compte.Model';
import { BankerService } from 'src/app/services/banker.service';

@Component({
  selector: 'app-virement',
  templateUrl: './virement.component.html',
  styleUrls: ['./virement.component.css']
})
export class VirementComponent implements OnInit {

  viirement : Transaction;
  idExist : Boolean = false;
  isVirement:boolean=false
  date:Date
  currentBanker: banquier

  constructor(private cmpteService : CompteService,private bankerService : BankerService) { }
  ngOnInit(): void {
    this.date=new Date()
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
sendVirement(virement)
{  
  this.viirement = new Transaction();

    this.viirement.person = this.Cin.value;  
    this.viirement.somme = this.montant.value;  
    this.viirement.bq= this.currentBanker;
    this.cmpteService.getCompteBynumInternational(this.numinternational.value).subscribe(response =>{
      if (response != -1){
        this.idExist = true;
        this.cmpteService.versement(this.numinternational.value,this.viirement).subscribe(  
          response => {  
            alert("virement fait avec success")
            this.isVirement=true
            
          });  
      }
      else{
        alert("Numero internation introuvable")

      }
    })
    
}  
public downloadAsPDF() {
  return xepOnline.Formatter.Format('MyDiv',{render: 'download',
  embedLocalImages :'true'
});
}
}
