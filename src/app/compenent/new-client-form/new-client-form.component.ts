import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/Models/Compte.Model';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-new-client-form',
  templateUrl: './new-client-form.component.html',
  styleUrls: ['./new-client-form.component.css']
})

export class NewClientFormComponent implements OnInit {
  startDate = new Date(1990, 0, 1);
  firstName = new FormControl(); 
  lastName = new FormControl();

  emailFormControl = new FormGroup({  
    lastName : new FormControl('' , Validators.required), 
    firstName : new FormControl('' , Validators.required), 
    numinternational : new FormControl('' , Validators.required),
    adresse : new FormControl('' , Validators.required) ,
    cin : new FormControl('' , Validators.required), 
    email : new FormControl('' , Validators.required),
    date : new FormControl('' , Validators.required) ,
    phone : new FormControl('' , Validators.required) 
  }); 

  matcher = new MyErrorStateMatcher();
  
    valider:boolean=true;
 
    
  constructor(private router:Router,private route:ActivatedRoute,private clientService : ClientService) { }

  get LastName(){  
    return this.emailFormControl.get('lastName');  
  }  
  get FirstName(){  
    return this.emailFormControl.get('firstName');  
  }  
  
  get Numinternational(){  
    return this.emailFormControl.get('numinternational');  
  }  
  get Adresse(){  
    return this.emailFormControl.get('adresse');  
  } 
  
  get Cin(){  
    return this.emailFormControl.get('cin');  
  } 
  
  get Email(){  
    return this.emailFormControl.get('email');  
  } 
  
  get Date(){  
    return this.emailFormControl.get('date');  
  } 
  
  get Phone(){  
    return this.emailFormControl.get('phone');  
  } 
  ngOnInit(): void {
  }
validation(){
  if(this.valider){
this.router.navigateByUrl("/newAcc");
  }
}
signup(donnesuser){
  let client =new Client();
  client.firstName=this.FirstName.value
  client.lastName=this.LastName.value;
  client.adresse=this.Adresse.value;
  client.cin=this.Cin.value;
  client.email=this.Email.value;
  client.dateNaissance=this.Date.value;
  client.phone=this.Phone.value;
  let Regex = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/ ;

  if(!client.email.match(Regex)){
    alert("veuillez inserer un email valide")
  }
  else{
  this.clientService.ajouterClient(client).subscribe(res =>{
    if(res == -1 )
      alert ("Email dupliqué, veuillez inserer un autre ");
      else if(res == -2 )
      alert ("CIN dupliqué, veuillez inserer un autre ");
      else{
      alert ("Client enregistré avec success");
      console.log(res["id"]);
      localStorage.setItem("idclient",res["id"]);
      this.router.navigate(['newAcc']);
    }
  })
}
}
}
