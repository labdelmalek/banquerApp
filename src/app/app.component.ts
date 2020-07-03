import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'banquier';

  ngOnInit(): void {

   

    $(function() {
      $('.topnav a').on("click", function() {
        $('.topnav a').removeClass("active");
        $(this).addClass("active");
       
      });
    });
    
  }
  
}
