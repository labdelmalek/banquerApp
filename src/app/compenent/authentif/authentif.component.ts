import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoginCredentils } from 'src/app/Models/LoginCredentials.Model';
import { Router } from '@angular/router';
import { AgenceService } from 'src/app/services/agence.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-authentif',
  templateUrl: './authentif.component.html',
  styleUrls: ['./authentif.component.css']
})

export class AuthentifComponent implements OnInit {
  username: string;
   
  password: string;
  constructor( private authentication : AuthenticationService, private router : Router,private agenceServ:AgenceService) { }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  islogged:boolean=false;

  logged(){
  this.islogged=true;
  }

  private banquier = new LoginCredentils();  
  myGroup:FormGroup;

  isFailed:boolean=false;

  ngOnInit() {  
    if((this.authentication.isLoggedIn()) )  
    {  
              this.router.navigate(['dashboard']);  
    }  
    else  
    {  
          this.router.navigate(['login']);  
    }   
  }  

  // create the form object.  
  form = new FormGroup({  
    email : new FormControl('' , [Validators.required,
    Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]), 
    
    password : new FormControl('' , Validators.required)  
  });  

  Login(LoginInformation)  
  {  
      this.banquier.email = this.Email.value;  
      this.banquier.password = this.Password.value;  
      this.authentication.login(this.banquier).subscribe(  
        response => {  
            let  result = response.body;
            if(parseInt(result) > 0)  
            {  
              let token = response.headers.get("Authorization");  
              let refresh = response.headers.get("RefreshToken");  
              localStorage.setItem("token" , token);  
              localStorage.setItem("idbq" , result);  
              localStorage.setItem("REFRESH_TOKEN" , refresh);  
              this.agenceServ.getAgenceByBanker(localStorage.getItem("idbq")).subscribe(res=>{
                localStorage.setItem("idag",(res.id).toString());
                location.reload();
              })
            
              console.log("User with is : "+response.body+" is connected");
              
            }   
            if(parseInt(result) == -1)  
            {  
              alert("please register before login Or Invalid combination of Email and password");  
            }  
            
        },  
        error => {  
           alert("Erreur d'authentification veuillez réssayer ")
            this.isFailed=true;
        }  
      );  
  }  

  get Email(){  
      return this.form.get('email');  
  }  

  get Password(){  
      return this.form.get('password');  
  }  
}
