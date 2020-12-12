import { Component, OnInit,OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit ,OnDestroy{

  constructor() {
    
   }

  ngOnInit(): void {
    console.log("start")
   
  }

  ngOnDestroy():void{
       console.log("Have a nice day...")
       window.location.reload();  
  }

  ngAfterViewInit(): void{
    //window.location.reload();
  }

}
