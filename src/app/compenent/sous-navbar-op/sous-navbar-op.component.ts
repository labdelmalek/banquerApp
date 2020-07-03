import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sous-navbar-op',
  templateUrl: './sous-navbar-op.component.html',
  styleUrls: ['./sous-navbar-op.component.css']
})
export class SousNavbarOpComponent implements OnInit {
selecte:boolean=false;
  constructor(private router:Router,private route:ActivatedRoute) {
   }
  ngOnInit(): void {
    // this.router.navigate(['simulation'],{relativeTo:this.route});
  }
 
}
