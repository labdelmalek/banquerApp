import { Component, OnInit } from '@angular/core';
import {FormControl,  Validators, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { CompteService } from 'src/app/services/compte.service';
import { Compte, Client, banquier } from 'src/app/Models/Compte.Model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ClientService } from 'src/app/services/client.service';
import { AgenceService } from 'src/app/services/agence.service';
import { Agence } from 'src/app/Models/agence';
import { BankerService } from 'src/app/services/banker.service';

interface Coompte {
  name: string;
}
@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {

  agence:Agence;
  montant:string
  typeC:string
  currentBanker: banquier

  constructor(private router:Router,private compteservice : CompteService, 
    private authenticationService : AuthenticationService,
    private clientService : ClientService,private agenceService:AgenceService,
    private bankerService : BankerService) { }
  client : Client ;

  ngOnInit(): void {
    this.agence=new Agence();
    this.client= new Client();
    if(this.authenticationService.isClientSelected() == false){
      this.router.navigate(['selectClient']);
    }
    else{
      this.clientService.getClientById(localStorage.getItem('idclient')).subscribe(res=>{
        let cl : any = res;
        this.client=cl;
        console.log(this.client);
      })
    }
    this.currentBanker= new banquier();
    this.bankerService.getCurrentBanker().subscribe((res : banquier)=>{
      this.currentBanker=res;
      console.log(this.currentBanker);
    })
    
    
  }
  compteControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  comptes: Coompte[] = [
    {name: 'Epargne'},
    {name: 'Cheque' },
  ];
  form = new FormGroup({  
    typecompte : new FormControl('' , Validators.required), 
    montant : new FormControl('' , Validators.required)  
  });  
  
  get Typecompte(){  
    return this.form.get('typecompte');  
  }  
  get Montant(){  
    return this.form.get('montant');  
  }  
  labValider:boolean=false;


  
  //fonction pour le choix du type de compte 
validation(name){
  if(name=='Epargne'){
  this.labValider=true;
  }
  if(name=='Cheque'){
    this.labValider=true;
      //this.router.navigateByUrl("/demandeCh");
}
}
addcompte(newcompte){
  let type=this.Typecompte.value["name"];
  console.log(this.Montant.value);
  let cmp =new Compte();
  cmp.balance=this.Montant.value;
  cmp.bq=this.currentBanker;
  if(type == "Epargne"){
  this.compteservice.ajouterEpargne(cmp).subscribe(res=>{
    if(res == -1 ){
      console.log("agence introuvable")
    }
    if(res == -2 ){
      console.log("client introuvable")
    }
    else{
      alert("compte ajouté avec success")
      console.log(res);
      this.validation(type);


    this.getAgenceByBanker();
    this.montant=this.Montant.value;
    this.typeC=this.Typecompte.value["name"];
    }
  });
  }
  else if(type == "Cheque"){
    this.compteservice.ajouterCheque(cmp).subscribe(res=>{
      if(res == -1 ){
        console.log("agence introuvable")
      }
      if(res == -2 ){
        console.log("client introuvable")
      }
      else{
        alert("compte ajouté avec success")
        console.log(res);
         localStorage.setItem("idnouveaucompte",res["numinternational"]);
         this.validation(type);

         this.getAgenceByBanker();
    this.montant=this.Montant.value;
    this.typeC=this.Typecompte.value["name"];

      }
    });
    }
}
oublierclientId(){
  this.authenticationService.forgetClientId();
  window.location.reload();
}

getAgenceByBanker(){
this.agenceService.getAgenceByBanker(localStorage.getItem('idbq')).subscribe(data =>{
  // let cl : any = data;
        this.agence=data;
        
}
)
}
public downloadAsPDF() {
  return xepOnline.Formatter.Format('MyDIv',{render: 'download'});
}
/*
public downloadAsPDF() {
  var node = document.getElementById('MyDIv');

  var img;
  var filename;
  var newImage;


  domtoimage.toPng(node, { bgcolor: '#fff' })

    .then(function(dataUrl) {

      img = new Image();
      img.src = dataUrl;
      newImage = img.src;

      img.onload = function(){

      var pdfWidth = img.width;
      var pdfHeight = img.height;

        // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image

        var doc;

        if(pdfWidth > pdfHeight)
        {
          doc = new jsPDF('l', 'px', [pdfWidth , pdfHeight]);
        }
        else
        {
          doc = new jsPDF('p', 'px', [pdfWidth , pdfHeight]);
        }
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();


        doc.addImage(newImage, 'PNG', 2, 2);
        filename = 'mypdf_' + '.pdf';
        doc.save(filename);

      };


    })
    .catch(function(error) {

     // Error Handling

    });
}



*/
demandeCC(){
  this.router.navigateByUrl("/demandeCh");
}
}