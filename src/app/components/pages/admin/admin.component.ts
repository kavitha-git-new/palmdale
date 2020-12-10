import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  title:string="";
  constructor(private titleService:Title , private router:Router) {
    this.router.onSameUrlNavigation = "reload";
    console.log("Reload");
   }
  
  ngOnInit(): void {
    this.title=this.titleService.getTitle();
    this.router.onSameUrlNavigation = "reload";

  }

  isTitle(ut:string|string[]):boolean {
    if (typeof ut == 'string')
      return (this.title == ut);
    else
    {
      const regExp:RegExp = new RegExp((ut as string[]).join("|"));
      const match = this.title.match(regExp);
       if(match&& match.length>0){
         return true
       }
       else{
         return false;
       }
    }

}

 

}


