import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.css']
})
export class SinglePageComponent implements OnInit, OnDestroy {
  blog: any = {};
  blogs: any = [];
  category: any = []
  tags: any = []
  msg: string = "";
  constructor(private actRoute: ActivatedRoute, private dataService: DataService, private router: Router) {
    this.getBlogs();
    this.getCategories();
    this.getTags();

  }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.blog.id = params.get('id');
      // alert(this.blog.id);
    });

    this.getBlogDetails(this.blog.id)


  }
  ngOnDestroy(): void {
    window.location.reload();
  }

  getDate(date: Date) {
    let dt = new Date(date);
    return dt.getDate() + ' ' + dt.toLocaleString('en-IN', { month: 'short' }) + ' ' + dt.getFullYear();

  }

  getBlogDetails(id: number) {
    this.dataService.getSpecificBlog(parseInt(this.blog.id)).subscribe(element => {
      this.blog = element.valueOf();
      console.log(this.blog);
      if (this.blog['response']['data']) { this.blog = JSON.parse(JSON.stringify(this.blog['response']['data'][0])); }
      else {
        if (this.blog['response']) {
          this.blog = JSON.parse(JSON.stringify(this.blog['response'][0]))
        }
      }
      console.log(this.blog.id);
      console.log(typeof (this.blog));

    });;
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

  onViewByCategory(id: number, name: string) {
    this.msg = "";
    this.dataService.getBlogByCategory(id,name).subscribe(element => {
      this.blogs = []
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
    this.msg = "";
    this.dataService.getBlogByTag(id,name).subscribe(element => {
      this.blogs = []
      if (JSON.parse(JSON.stringify(element)).response.statuscode === 204 || JSON.parse(JSON.stringify(element)).response.statuscode !== 200) {
        this.msg = "No blogs found under " + name + " tag"
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

  getTags() {
    this.dataService.getTagsWb().subscribe(element => {
      console.log(element)
      this.tags = element.valueOf()

      if (this.tags['response']['data']) {
        this.tags = this.tags['response']['data'].valueOf();
        console.log('this.tags')
        console.log(this.tags);

        console.log(this.tags[0]);
        console.log(typeof (this.tags))
      }
      else if (this.tags['response']) {
        this.tags = this.tags['response'].valueOf();
        console.log('this.tags')
        console.log(this.tags);

        console.log(this.tags[0]);
        console.log(typeof (this.tags))
      }
    });
  }

  onViewByBlog(id: number) {
    this.getBlogDetails(id);
    console.table(this.blog)
  }


}
