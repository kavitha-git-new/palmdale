import { Component, OnInit,Input } from '@angular/core';
import {Title} from '@angular/platform-browser';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  title:string='Home';
  @Input() heading:string=""
  constructor(private titleService : Title) {
   
   }

  ngOnInit(): void {
    this.title=this.titleService.getTitle();
    console.log(this.title);
  }

}
