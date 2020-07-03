import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { formatCurrency } from '@angular/common';
import { SousNavbarComponent } from './compenent/sous-navbar/sous-navbar.component';
import { SousNavbarOpComponent } from './compenent/sous-navbar-op/sous-navbar-op.component';
import { EncaissementOpComponent } from './compenent/encaissement-op/encaissement-op.component';
import { DemandeChequeCarteComponent } from './compenent/demande-cheque-carte/demande-cheque-carte.component';
import { DemandeCreditComponent } from './compenent/demande-credit/demande-credit.component';
import { NewAccountComponent } from './compenent/new-account/new-account.component';
import { NewClientFormComponent } from './compenent/new-client-form/new-client-form.component';
import { SimulationCreditComponent } from './compenent/simulation-credit/simulation-credit.component';
import { RetraitComponent } from './compenent/retrait/retrait.component';
import { EncaissementComponent } from './compenent/encaissement/encaissement.component';
import { AcDesCompteComponent } from './compenent/ac-des-compte/ac-des-compte.component';
import { TransactionComponent } from './compenent/transaction/transaction.component';
import { NavbarComponent } from './compenent/navbar/navbar.component';
import { AuthentifComponent } from './compenent/authentif/authentif.component';
import { VirementComponent } from './compenent/virement/virement.component';
import { DashboardComponent } from './compenent/dashboard/dashboard.component';
import { RechercherClientComponent } from './compenent/rechercher-client/rechercher-client.component';
import { ClientSelectOpComponent } from './compenent/client-select-op/client-select-op.component';
import { OperationsSurCompteComponent } from './compenent/operations-sur-compte/operations-sur-compte.component';
import { MescreditsComponent } from './compenent/mescredits/mescredits.component';
import{AuthGuardService} from './guards/auth-guard.service';
import { AcceuilComponent } from './compenent/acceuil/acceuil.component';



const routes: Routes = [
  {path:'',component:AcceuilComponent},

  {path:'login',component:AuthentifComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'selectClient',component: RechercherClientComponent,canActivate: [AuthGuardService]},
    {path:'selectopclient',component : ClientSelectOpComponent,canActivate: [AuthGuardService]},
    {path:'ajoutercompte',component : NewAccountComponent,canActivate: [AuthGuardService]},
    {path:'operationssurcompte',component : OperationsSurCompteComponent,canActivate: [AuthGuardService]},
    {path:'mescredits',component : MescreditsComponent,canActivate: [AuthGuardService]},


  
  {path:'Snavbar',component:SousNavbarComponent,canActivate: [AuthGuardService],
children:[ 
  {path:'retrait',component:RetraitComponent},
  {path:'demandeCh',component:DemandeChequeCarteComponent},
  {path:'demandeCr',component:DemandeCreditComponent},
  {path:'encaCh',component:EncaissementComponent},
  {path:'transactions',component:TransactionComponent}
]},
    {
    path:'Snavbarop',component:SousNavbarOpComponent,canActivate: [AuthGuardService],
    children:[
      {path:'encaissement',component:EncaissementOpComponent},
      {path:'virement',component : VirementComponent},
      {path:'simulation',component:SimulationCreditComponent}
    ]
},
  {path:'demandeCh',component:DemandeChequeCarteComponent,canActivate: [AuthGuardService]},
  {path:'newAcc',component:NewAccountComponent,canActivate: [AuthGuardService]},
  {path:'newCli',component:NewClientFormComponent,canActivate: [AuthGuardService]},
  {path:'**',component:DashboardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
