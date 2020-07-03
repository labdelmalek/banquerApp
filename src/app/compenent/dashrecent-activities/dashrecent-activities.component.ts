import { Component, OnInit, Input } from '@angular/core';
//import { Transaction } from 'src/app/Models/Transaction.Model';
import { Router, ActivatedRoute } from '@angular/router';
import { Transaction } from 'src/app/Models/Transaction.Model';
//import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-dashrecent-activities',
  templateUrl: './dashrecent-activities.component.html',
  styleUrls: ['./dashrecent-activities.component.css']
})
export class DashrecentActivitiesComponent implements OnInit {

  @Input() transaction : Array<Transaction>;
  constructor(){
  }
  page ;
  totalRecords;
  
accountId:number; 

  ngOnInit(){
   
  }
 

}
