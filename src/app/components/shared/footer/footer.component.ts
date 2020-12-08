import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() heading:string=""
  constructor() { }

  ngOnInit(): void {
   
  }
  
  getYear(){
    return new Date().getFullYear();
  }

  checkHeading(){
    console.log(this.heading)
    if(this.heading==='Dashboard'){
    
      return 'absolute';
    }
    else {
   
      return 'relative';}
  }

}
