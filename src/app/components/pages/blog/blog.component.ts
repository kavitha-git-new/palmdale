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
  category:any=[]
  tag:any=[]
  i:number=0;
  a=['sdfsd','sdfsdf']
  constructor(private dataService:DataService) { 
   this.getBlogs();
   this.getCategories();
  }

  ngOnInit(): void {
  //  this.getBlogs();
    
  }

  ngOnDestroy():void{
    window.location.reload();
  }
  
  getBlogs(){
    this.dataService.getBlogsWb().subscribe(element=>{
      let b = element.valueOf()
      this.blogs=element.valueOf()
       
     if(this.blogs['response']['data'])
    { this.blogs=this.blogs['response']['data'].valueOf();
      console.log('this.blogs')
      console.log(this.blogs)
      
          
      console.log(this.blogs[0]);
      console.log(typeof(this.blogs))
      console.log(this.blogs[0].category)}
/*let c:any={};

      for(this.i=0; this.i<this.blogs.length;this.i++)
      {
       // console.log(this.blogs[this.i])
     

    c=this.category.find(e => e.name===this.blogs[this.i].category
    );
    if(c===undefined){
      this.category.push({"name":this.blogs[this.i].category, "count":1})
    }
    else{
        this.category.findIndex(e=>{if(e.name===c.name){
             e.count=e.count+1;
        }})
    }
      
      console.log(this.category);
                 
      
         
      }*/
       
      
    });


  }

  getCategories(){
    this.dataService.getCategoriesWb().subscribe(element=>{
      let b = element.valueOf()
      this.category=element.valueOf()
       
     if(this.category['response']['data'])
    { this.category=this.category['response']['data'].valueOf();
      console.log('this.categories')
      console.log(this.category)
      
          
      console.log(this.category[0]);
      console.log(typeof(this.category))
      }})
  }

  onReadMore(id:number){
    return id;
  }
  getDate(date:Date){
     let dt= new Date(date);
     return dt.getDate()+' '+dt.toLocaleString('en-IN', { month: 'short' })+' '+dt.getFullYear();
  
  }
}
