import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit ,OnDestroy{

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy():void{
    window.location.reload();
  }

}
