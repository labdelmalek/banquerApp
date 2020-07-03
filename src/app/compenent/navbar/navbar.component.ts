import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/Models/Compte.Model';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
activ:boolean;
isAuthenticated : boolean=false;
client:any;
  constructor(private router:Router,private clientService:ClientService,private route:ActivatedRoute, private authService : AuthenticationService) { 
    this.selectClient();
  }

  ngOnInit() {
    this.isAuthenticated=this.authService.isLoggedIn();
    this.selectClient();
    
   }
   logout(){

    this.authService.Logout();
   // this.router.navigate(['login']);
    window.location.reload();
   }

   selectClient(){
     if(localStorage.getItem('idclient')){
      this.clientService.getClient().subscribe(res=>{
        this.client=new Client();
        if(res){
         this.client=res;
        }
        else{
          console.log("client n'est pas choisi")
        }
       })
       //window.location.reload();
     }
   }


}
