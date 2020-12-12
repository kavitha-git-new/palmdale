import { Component, Input, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { AddElementService } from "../../services/add-element.service";
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styles: [
  ]
})
export class SideBarComponent implements OnInit {
 @Input() heading:string=""
  constructor(private addElementService:AddElementService,private router:Router ) { }

  ngOnInit(): void {
   
   
  }
  
ngOnDestroy():void{
  this.addElementService.createLink();
}
  isTitle(ut: string | string[]): boolean {
    if (typeof ut == 'string') {
      console.log((this.heading == ut));
      return (this.heading == ut);
    }
    else {
     
      const match = ut.findIndex(e => e === this.heading);
      if (match !== -1) {
        console.log("Dashbaord");
       this.addElementService.removeLink();
       this.router.onSameUrlNavigation = "reload";
       console.log("Reload");
        return true;
      }
      else {
     // this.addElementService.createLink();
        return false;
      }
    }

  }

}
