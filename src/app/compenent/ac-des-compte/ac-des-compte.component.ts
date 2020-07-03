import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ac-des-compte',
  templateUrl: './ac-des-compte.component.html',
  styleUrls: ['./ac-des-compte.component.css']
})
export class AcDesCompteComponent implements OnInit {
  selected : Boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
