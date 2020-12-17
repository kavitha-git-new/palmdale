import { Component, OnDestroy, OnInit } from '@angular/core';
import { element } from 'protractor';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit ,OnDestroy{
  blogs:any =[]
  constructor(private dataService:DataService) { 
   this.getBlogs();
  }

  ngOnInit(): void {
  //  this.getBlogs();
    
  }

  ngOnDestroy():void{
    window.location.reload();
  }
  
  getBlogs(){
    this.dataService.getBlogsWb().subscribe(element=>{
      this.blogs= element.valueOf();
       
      this.blogs= Object.values(this.blogs['response']['data'])
     // this.blogs=this.blogs['response']['data'];
      console.log('this.blogs')
      console.log(this.blogs)
          
      console.log(this.blogs[0]);
      console.log(typeof(this.blogs))
       
      
    })
  }

  onReadMore(id:number){

    return id;
  }
  getDate(date:Date){
     let dt= new Date(date);

     return dt.getDate()+' '+dt.toLocaleString('en-IN', { month: 'short' })+' '+dt.getFullYear();
  
  }
}
