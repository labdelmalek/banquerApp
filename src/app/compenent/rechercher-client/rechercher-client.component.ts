import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/Models/Compte.Model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rechercher-client',
  templateUrl: './rechercher-client.component.html',
  styleUrls: ['./rechercher-client.component.css']
})
export class RechercherClientComponent implements OnInit {

  constructor(private clientService : ClientService,private authenticationService : AuthenticationService, private router : Router) { }
  ngOnInit(): void {
    if(this.authenticationService.isClientSelected()){
      this.router.navigate(['selectopclient']);  
    }
  }
  // create the form object.  
form = new FormGroup({  
  cin : new FormControl('' , Validators.required)
});  

get Cin(){  
  return this.form.get('cin');  
}  
searchClientByCin(ClientCin){
console.log(this.Cin.value);
this.clientService.getClientByCIN(this.Cin.value).subscribe(res =>{
  if (res == -1 ){
    alert("Client introuvable");
  }
  else{
    let cl : any = res;
    let cl1 :Client = cl;
    localStorage.setItem("idclient",cl1.id.toString());
    this.router.navigate(['selectopclient']);
    window.location.reload();
  }
})
}

}
