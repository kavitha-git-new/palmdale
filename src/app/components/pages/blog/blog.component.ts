import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { element, error } from 'protractor';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {
  blogs: any = []
  blog: any = {};
  category: any = []
  tags: any = []
  itemsRecords: number = 0;
  page: number = 1;
  i: number = 0;
  show: boolean = true;
  heading: string = "BLOG";
  subHeading: string = "BLOG - WE’RE HERE TO INDUCE A CHANGE";
  subheading1: string = "Blogs";
  subheading2: string = "News & Updates";
  searchText: string = "";
  //a=['sdfsd','sdfsdf']
  msg: string = "";
  constructor(private dataService: DataService, private router: Router, private titleService: Title, private actRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    //  this.getBlogs();
    console.log(this.titleService.getTitle());
    // console.log(this.actRoute.url);
    if (this.titleService.getTitle().toString() === 'Blog Details') {
      this.actRoute.paramMap.subscribe(params => {
        this.blog.id = params.get('id');
        // alert(this.blog.id);

      }, (error: any) => {
        console.log(error);
      });
      this.onReadMore(this.blog.id);
    }

    this.getBlogs();
    this.getCategories();
    this.getTags();
  }

  ngOnDestroy(): void {
    // window.location.reload();
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
        this.itemsRecords = this.blogs.length;
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
    this.dataService.getCategoriesWb().subscribe((element: any) => {

      this.category = element.valueOf()

      if (this.category['response']['data']) {
        this.category = this.category['response']['data'].valueOf();
        // console.log('this.categories')
        // console.log(this.category)
        // console.log(this.category[0]);
        // console.log(typeof (this.category));
      }
    }, (error: any) => {
      console.log(error);
    })
  }

  getTags() {
    this.dataService.getTagsWb().subscribe((element: any) => {
      console.log(element)
      this.tags = element.valueOf()

      if (this.tags['response']['data']) {
        this.tags = this.tags['response']['data'].valueOf();
        console.log('this.tags')
        console.log(this.tags);

        // console.log(this.tags[0]);
        // console.log(typeof (this.tags))
      }
      else if (this.tags['response']) {
        this.tags = this.tags['response'].valueOf();
        console.log('this.tags')
        console.log(this.tags);

        // console.log(this.tags[0]);
        // console.log(typeof (this.tags))
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  onReadMore(id: number) {
    //this.router.navigate(['single-page/',id]);
    //return id;
    this.msg = "";
    this.heading = "Blog Details";
    this.subheading1 = "Blog"
    this.subHeading = "Blog Details"
    this.show = false;
    this.dataService.getSpecificBlog(id).subscribe((element: any) => {
      this.blog = element.valueOf();
      console.log(this.blog);
      if (this.blog['response']['data']) { this.blog = JSON.parse(JSON.stringify(this.blog['response']['data'][0])); }
      else {
        if (this.blog['response']) {
          this.blog = JSON.parse(JSON.stringify(this.blog['response'][0]))
        }
      }
      // console.log(this.blog.id);
      // console.log(typeof (this.blog));

    }, (error: any) => {
      console.log(error);
    });;

  }
  getDate(date: Date) {
    let dt = new Date(date);
    return dt.getDate() + ' ' + dt.toLocaleString('en-IN', { month: 'short' }) + ' ' + dt.getFullYear();

  }

  onViewByCategory(id: number, name: string) {
    this.show = true;
    this.msg = "";
    this.dataService.getBlogByCategory(id, name).subscribe((element: any) => {
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

          // console.log(this.blogs[0]);
          // console.log(typeof (this.blogs))
          // console.log(this.blogs[0].category)
          this.itemsRecords = this.blogs.length;
        }
      }
    }, (error: any) => {
      console.log(error);
    });


  }

  //onViewBlogByTag
  onViewBlogByTag(id: number, name: string) {
    this.show = true;
    this.msg = "";
    this.dataService.getBlogByTag(id, name).subscribe((element: any) => {
      this.blogs = []
      if (JSON.parse(JSON.stringify(element)).response.statuscode === 204 || JSON.parse(JSON.stringify(element)).response.statuscode !== 200) {
        this.msg = "No blogs found under " + name + " tag";
      }
      else {

        console.log(element);

        this.blogs = element.valueOf()

        if (this.blogs['response']['data']) {
          //this.blogs = [];
          this.blogs = this.blogs['response']['data'].valueOf();
          console.log('this.blogs')
          console.log(this.blogs)
          this.itemsRecords = this.blogs.length;;
        }
           }
           
    }, (error: any) => {
      console.log(error);
    });


  }

  getArray(e: any) {
    let temp = JSON.parse(JSON.stringify(e))
    //console.log(e)  ;
    return temp;
  }

}
