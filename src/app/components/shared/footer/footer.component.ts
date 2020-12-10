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

  isTitle(ut: string | string[]): boolean {
    if (typeof ut == 'string') {
      console.log((this.heading == ut));
      return (this.heading == ut);
    }
    else {
     
      const match = ut.findIndex(e => e === this.heading);
      if (match !== -1) {
        return true;
      }
      else {
        return false;
      }
    }

  }

}
