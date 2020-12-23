import { Component, OnDestroy, OnInit } from '@angular/core';
import { element } from 'protractor';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {
  blogs: any = []
  category: any = []
  tags: any = []
  i: number = 0;
  //a=['sdfsd','sdfsdf']
  msg: string = "";
  constructor(private dataService: DataService) {
    this.getBlogs();
    this.getCategories();
    this.getTags();
  }

  ngOnInit(): void {
    //  this.getBlogs();

  }

  ngOnDestroy(): void {
    window.location.reload();
  }

  getBlogs() {
    this.dataService.getBlogsWb().subscribe(element => {
    //  let b = element.valueOf()
      this.blogs = element.valueOf()

      if (this.blogs['response']['data']) {
        this.blogs = this.blogs['response']['data'].valueOf();
        console.log('this.blogs')
        console.log(this.blogs)
        console.log(this.blogs[0]);
        console.log(typeof (this.blogs))
        console.log(this.blogs[0].category)
      }
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

  getCategories() {
    this.dataService.getCategoriesWb().subscribe(element => {
    
      this.category = element.valueOf()

      if (this.category['response']['data']) {
        this.category = this.category['response']['data'].valueOf();
        console.log('this.categories')
        console.log(this.category)


        console.log(this.category[0]);
        console.log(typeof (this.category))
      }
    })
  }

  getTags(){
    this.dataService.getTags().subscribe(element => {
     console.log(element)
      this.tags = element.valueOf()

      if (this.tags['response']) {
        this.tags = this.tags['response'].valueOf();
        console.log('this.tags')
        console.log(this.tags);

        console.log(this.tags[0]);
        console.log(typeof (this.tags))
      }
      else if(this.tags['response']['data']){
        this.tags = this.tags['response'].valueOf();
        console.log('this.tags')
        console.log(this.tags);

        console.log(this.tags[0]);
        console.log(typeof (this.tags))
      }
    });
  }

  onReadMore(id: number) {
    return id;
  }
  getDate(date: Date) {
    let dt = new Date(date);
    return dt.getDate() + ' ' + dt.toLocaleString('en-IN', { month: 'short' }) + ' ' + dt.getFullYear();

  }

  onViewByCategory(id: number, name: string) {
    this.msg="";
    this.dataService.getBlogByCategory(id).subscribe(element => {
    this.blogs=[]
      if (JSON.parse(JSON.stringify(element)).response.statuscode === 204 || JSON.parse(JSON.stringify(element)).response.statuscode !== 200) {
        this.msg = "No blogs found under " + name + " category"
      }
      else {
        
        console.log(element);

          this.blogs = element.valueOf()

        if (this.blogs['response']['data']) {
          //this.blogs = [];
          this.blogs = this.blogs['response']['data'].valueOf();
          console.log('this.blogs')
          console.log(this.blogs)

          console.log(this.blogs[0]);
          console.log(typeof (this.blogs))
          console.log(this.blogs[0].category)


        }
      }




    });


  }

  //onViewBlogByTag
  onViewBlogByTag(id: number, name: string) {
    this.msg="";
    this.dataService.getBlogByTag(id).subscribe(element => {
    this.blogs=[]
      if (JSON.parse(JSON.stringify(element)).response.statuscode === 204 || JSON.parse(JSON.stringify(element)).response.statuscode !== 200) {
        this.msg = "No blogs found under " + name + " category"
      }
      else {
        
        console.log(element);

          this.blogs = element.valueOf()

        if (this.blogs['response']['data']) {
          //this.blogs = [];
          this.blogs = this.blogs['response']['data'].valueOf();
          console.log('this.blogs')
          console.log(this.blogs)

          console.log(this.blogs[0]);
          console.log(typeof (this.blogs))
          console.log(this.blogs[0].category)


        }
      }




    });


  }



}
