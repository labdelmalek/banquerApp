import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from 'src/app/Models/Transaction.Model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mouvement-cmpte',
  templateUrl: './mouvement-cmpte.component.html',
  styleUrls: ['./mouvement-cmpte.component.css']
})
export class MouvementCmpteComponent implements OnInit {

 
  @Input() transaction : Array<Transaction>;
  constructor(private router:Router,private route:ActivatedRoute){
  }
  page ;
  totalRecords;
  
accountId:number;

  ngOnInit(){
  }

}
