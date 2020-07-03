import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { Client } from 'src/app/Models/Compte.Model';
import { ClientService } from 'src/app/services/client.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../demande-credit/demande-credit.component';

@Component({
  selector: 'app-client-select-op',
  templateUrl: './client-select-op.component.html',
  styleUrls: ['./client-select-op.component.css']
})
export class ClientSelectOpComponent implements OnInit {

  constructor(private authenticationService : AuthenticationService,private router : Router, private clientService: ClientService) { }
  client : Client ;
  ngOnInit(): void {
    
    this.client= new Client();
    if(this.authenticationService.isClientSelected() == false){
      this.router.navigate(['selectClient']);
    } 
    else{
      this.clientService.getClientById(localStorage.getItem('idclient')).subscribe(res=>{
        let cl : any = res;
        this.client=cl;
        console.log(this.client);
        this.emailFormControl.patchValue({
          lastName:this.client.lastName,
          firstName:this.client.firstName,
          adresse:this.client.adresse,
          email:this.client.email,
          phone:this.client.phone
      
        });
      })
    }
  }
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
    phone : new FormControl('' , Validators.required) 
  }); 

  matcher = new MyErrorStateMatcher();
  
    valider:boolean=true;
 
    

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

  
  get Phone(){  
    return this.emailFormControl.get('phone');  
  } 
validation(){
  if(this.valider){
this.router.navigateByUrl("/newAcc");
  }
}
oublierclientId(){
  this.authenticationService.forgetClientId();
  window.location.reload();
}
signup(donnesuser){

  let cl1: Client = this.client;
cl1.lastName=this.LastName.value;
cl1.firstName=this.FirstName.value;
cl1.adresse=this.Adresse.value;
cl1.email=this.Email.value;
cl1.phone=this.Phone.value;
this.clientService.updateClient(cl1).subscribe(res=>{
  if (res == -1){
    alert("Client introuvable");
  }
  if (res == -2){
    alert("Email Dupliqué");
  }
  else{
    alert("Informations clients mises à jour avec success");
    window.location.reload();
  }
})
}


}
