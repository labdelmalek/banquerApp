import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Compte } from 'src/app/Models/Compte.Model';
import { Router, ActivatedRoute } from '@angular/router';
import { isUndefined } from 'util';
import { CompteService } from 'src/app/services/compte.service';

@Component({
  selector: 'app-dashboard-account-table',
  templateUrl: './dashboard-account-table.component.html',
  styleUrls: ['./dashboard-account-table.component.css']
})
export class DashboardAccountTableComponent implements OnInit {
 @Input() accounts : Array<Compte>;
  @Output() ccompte = new EventEmitter<Compte>();

  public epargne:any;
  public cheque:any;
  public isAuthenticated:any;
  totalRecords : string;
  page : number = 1;
  showVar: boolean = true;
 constructor(private clientsservice:CompteService,private router:Router,private routeactuel:ActivatedRoute) { }


  ngOnInit(): void {
}
def(b:any) : boolean{
  return isUndefined(b);
} 
select(comppptes : Compte){
  this.ccompte.emit(comppptes);
}

}
