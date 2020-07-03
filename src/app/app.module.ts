import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './compenent/navbar/navbar.component';
import { SousNavbarComponent } from './compenent/sous-navbar/sous-navbar.component';
import { SousNavbarOpComponent } from './compenent/sous-navbar-op/sous-navbar-op.component';
import { EncaissementOpComponent } from './compenent/encaissement-op/encaissement-op.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';;
import {MatFormFieldModule} from '@angular/material/form-field' ;
import { MatInputModule } from '@angular/material/input';
import { NewClientFormComponent } from './compenent/new-client-form/new-client-form.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewAccountComponent } from './compenent/new-account/new-account.component';
import { DemandeChequeCarteComponent } from './compenent/demande-cheque-carte/demande-cheque-carte.component';
import { DemandeCreditComponent } from './compenent/demande-credit/demande-credit.component';
import { RechercherClientComponent } from './compenent/rechercher-client/rechercher-client.component';
import { SimulationCreditComponent } from './compenent/simulation-credit/simulation-credit.component';
import { RetraitComponent } from './compenent/retrait/retrait.component';
import { DashrecentActivitiesComponent } from './compenent/dashrecent-activities/dashrecent-activities.component';
import { EncaissementComponent } from './compenent/encaissement/encaissement.component';
import { DashboardAccountTableComponent } from './compenent/dashboard-account-table/dashboard-account-table.component';
import { AcDesCompteComponent } from './compenent/ac-des-compte/ac-des-compte.component';
import { TransactionComponent } from './compenent/transaction/transaction.component';
import { MouvementCmpteComponent } from './compenent/mouvement-cmpte/mouvement-cmpte.component';
import { BlocageCompteComponent } from './compenent/blocage-compte/blocage-compte.component';
import { BlocageCarteComponent } from './compenent/blocage-carte/blocage-carte.component';
import { AuthentifComponent } from './compenent/authentif/authentif.component';
import { TransactionFormComponent } from './compenent/transaction-form/transaction-form.component';
import { VirementComponent } from './compenent/virement/virement.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './compenent/dashboard/dashboard.component';
import { ClientSelectOpComponent } from './compenent/client-select-op/client-select-op.component';
import { OperationsSurCompteComponent } from './compenent/operations-sur-compte/operations-sur-compte.component';
import { NgpSortModule } from "ngp-sort-pipe";
import { MescreditsComponent } from './compenent/mescredits/mescredits.component';
import { TabCreditComponent } from './compenent/tab-credit/tab-credit.component';
import { Interceptor } from './Interceptors/HttpInterceptor';
import { HTTPListener } from './Interceptors/HttpInterceptor2';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { CarteBComponent } from './compenent/carte-b/carte-b.component';
import { AcceuilComponent } from './compenent/acceuil/acceuil.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SousNavbarComponent,
    SousNavbarOpComponent,
    EncaissementOpComponent,
    NewClientFormComponent,
    NewAccountComponent,
    DemandeChequeCarteComponent,
    DemandeCreditComponent,
    RechercherClientComponent,
    SimulationCreditComponent,
    RetraitComponent,
    DashrecentActivitiesComponent,
    EncaissementComponent,
    DashboardAccountTableComponent,
    AcDesCompteComponent,
    TransactionComponent,
    MouvementCmpteComponent,
    BlocageCompteComponent,
    BlocageCarteComponent,
    AuthentifComponent,
    TransactionFormComponent,
    VirementComponent,
    DashboardComponent,
    ClientSelectOpComponent,
    OperationsSurCompteComponent,
    MescreditsComponent,
    TabCreditComponent,
    CarteBComponent,
    AcceuilComponent,
    
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,MatCardModule,MatToolbarModule,MatMenuModule,MatFormFieldModule,MatInputModule,MatDatepickerModule,MatCheckboxModule,
    MatAutocompleteModule,MatRadioModule,MatTableModule,MatSnackBarModule,MatTooltipModule,MatDialogModule,MatProgressBarModule,MatProgressSpinnerModule,MatButtonToggleModule,
    MatSelectModule,MatSliderModule,MatSidenavModule,MatStepperModule,MatChipsModule,MatPaginatorModule,MatSortModule,MatExpansionModule,MatSlideToggleModule,
    MatTabsModule,MatListModule,MatGridListModule,MatNativeDateModule,FormsModule,ReactiveFormsModule,HttpClientModule,NgxPaginationModule,NgpSortModule,NgbModule
  ],
  providers: [AuthenticationService,AuthGuardService,{
    provide : HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi : true
  },{
    provide : HTTP_INTERCEPTORS,
    useClass: HTTPListener,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {

 
 }
