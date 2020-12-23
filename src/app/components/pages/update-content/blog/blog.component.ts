import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DataService } from 'src/app/components/services/data.service';
import { ModalService } from 'src/app/components/_modal';
import { environment } from "../../../../../environments/environment";
@Component({
  selector: 'app-blog',
  templateUrl: './blog-temp.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  items: any = [];
  itemsRecords: number = 0;
  page: number = 1;
  btnName: string = "Save";
  blog: any = {};

  tags: any = [];
  categories: any = [];
  blogs:any=[];
  item: any = [];
  title: string = "";
  titleDescription: string = "";
  errMsg:string="";
  minDate:Date= new Date();
  selectedFiles: any;
  bsConfig:Partial<BsDatepickerConfig>=Object.assign({}, { containerClass: 'theme-blue' });
  constructor(private modalService: ModalService, private dataService: DataService, private http:HttpClient) { 
   this.blog.images=[]
   const token=document.getElementById("token");
   token?.setAttribute('value',JSON.parse(sessionStorage.currentUser)[0].token)
   console.log('token');
  }

  ngOnInit(): void {
    // this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`, description: `Item ${i + 1}` }));
    // this.itemsRecords = this.items.length;
    this.getBlogs();
    this.getCategories();
    this.getTags();
   // this.bsConfig = Object.assign({}, { containerClass: 'blue' });
     this.blog.dtPublished= new Date();
  }

  onEdit(id: number) {
    this.getTags();
    this.getCategories();
    this.errMsg = "";
    this.title = "Edit";
    this.titleDescription = "Edit details about the blog to update.";
    this.btnName = "Update"
    this.blog.id = id;
    this.dataService.getBlog(id).subscribe(element => {
      this.blog = element.valueOf();

      this.blog = JSON.parse(JSON.stringify(this.blog['response'][0]));
      console.log(this.blog.id);
      console.log(typeof (this.blog));
    });
    console.log(id);

   this.modalService.open('exampleModal');
  }

  onAdd(btName: string) {
    this.title = "Add";
    this.titleDescription = "Add details about the blog to save.";
    this.btnName = btName;
    this.blog.id = 0;
    this.blog.name = '';
    this.blog.description = '';
    this.blog.content = '';
    this.errMsg = '';
    this.blog.category='';
    this.blog.tag='';

    //to fill all the dropdowns
    
    this.modalService.open('exampleModal');
  }

  saveData(btnName: string) {
    alert("save date in Db.");

    console.log(this.blog);
    if(this.blog.title==="" || this.blog.title===null){
      alert("name")
      this.errMsg="Please provide valid details.";
      return false;
    }
    else{
      this.errMsg="";
    }
    if(this.blog.isPublished!=="T" && this.blog.isPublished!=='F' || this.blog.isPublished===''){
      alert("isPublished:"+ this.blog.isPublished)
      this.errMsg="Please provide valid details.";
      return false;
    }
    else{
      this.errMsg="";
    }
    if(this.blog.dtPublished==='' || this.blog.dtPublished===null){
      alert("Date")
      this.errMsg="Please provide valid details.";
      return false;
    }
    else{
      this.errMsg="";
    }
    if(this.blog.category==='' || this.blog.tag===''){
      alert("Category and Tag :"+this.blogs.category+" "+ this.blog.tag)
      this.errMsg="Please provide valid details.";
      return false;
    }
    else{
      this.errMsg="";
    }
    if(this.blog.images.length===0 || this.blog.images===null){

      alert("Image")
      this.errMsg="Please provide valid details.";
      return false;
    }
    else{
      this.errMsg="";
    }
    if(this.blog.description==='' || this.blog.description===null){
      alert("Description")
      this.errMsg="Please provide valid details.";
      return false;
    }
    else{
      this.errMsg="";
    }
    if(this.blog.title!==''&& this.blog.isPublished!==''&& this.blog.dtPublished && this.blog.tag.length>1 && this.blog.category.length>1&& this.blog.images.length>0 &&this.blog.description){
      if(this.btnName==='Save' || btnName==='Save')
      {
        alert("Save")

        //to save the detais
        // this.dataService.saveBlog(JSON.stringify(this.blog)).subscribe(response => {
        //   console.log(response);
        //   if (JSON.parse(JSON.stringify(response)).response.statuscode === 403 || JSON.parse(JSON.stringify(response)).response.message) {
        //     this.errMsg = "Please try again."
        //   }
        //   else{
        //   //  alert(JSON.parse(JSON.stringify(response)));
        //     if(JSON.parse(JSON.stringify(response)).response.message=="Blog Created Successfully." && JSON.parse(JSON.stringify(response)).response.statuscode === 200){

        //      // this.succMsg= this.tag.name+" tag is saved";
        //       //this.blog=[];
        //       this.getBlogs();
        //       this.modalService.close("exampleModal")
        //     }
        //     else{
        //       this.errMsg="Please try again."
        //     }
        //   }
        // });;
 let params = this.blog;
 params.token= JSON.parse(sessionStorage.currentUser)[0].token;
 console.log(params)
        this.http.post(environment.apiUrl+'createBlog',JSON.stringify(params),{headers: new HttpHeaders({ 'Content-Type': 'application/json'})}).subscribe(response=>{
          console.log(response);
          if (JSON.parse(JSON.stringify(response)).response.statuscode === 403 || JSON.parse(JSON.stringify(response)).response.message) {
            this.errMsg = "Please try again."
          }
          else{
          //  alert(JSON.parse(JSON.stringify(response)));
            if(JSON.parse(JSON.stringify(response)).response.message=="Blog Created Successfully." && JSON.parse(JSON.stringify(response)).response.statuscode === 200){

             // this.succMsg= this.tag.name+" tag is saved";
              //this.blog=[];
              this.getBlogs();
              this.modalService.close("exampleModal")
            }
            else{
              this.errMsg="Please try again."
            }
          }
      });
      }
      else{
        //to update the details
        if(this.blog.id!=='')
        {
          this.dataService.updateBlog(JSON.stringify(this.blog)).subscribe(response => {
          console.log(response);
          if (JSON.parse(JSON.stringify(response)).response.statuscode === 403 || JSON.parse(JSON.stringify(response)).response.message.name === 'The name has already been taken.') {
            this.errMsg = "Please try again."
          }
          else{
            if(JSON.parse(JSON.stringify(response)).response.message=="Blog Updated Successfully." || JSON.parse(JSON.stringify(response)).response.statuscode === 200 ){

              this.blogs=[];
              this.getBlogs();
              this.modalService.close("exampleModal")
            }
            else{
              this.errMsg="Please try again."
            }
          }
        })
        
        }
      }
      alert("Data to save in Db.");      
 
     this.modalService.close("exampleModal")
       return true;
    }
    else{
      this.errMsg="Please provide valid details.";
      return false;
    }


  }

  onSelectFile(event:any){
    const files = event.target.files;
    let isImage = true;
    console.log(event.target.files)
    for (let i = 0; i < files.length; i++) {
      if (files.item(i).type.match('image.*')) {
        console.log(this.blog.images)
        console.log('this.blog.images')
        console.log(files.item(i)['name'])
      this.blog.images.push(files.item(i))
        continue;
      } else {
        isImage = false;
        alert('invalid format!');
        break;
      }
    }
  
    if (isImage) {
      this.selectedFiles = event.target.files;
    } else {
      this.selectedFiles = undefined;
      event.srcElement.percentage = null;
    }
    
    console.log(event.returnValue);
  }

  onClose(id: string) {
    this.modalService.close(id)
  }

  onDelete(id: number,name:string) {
    console.log(id);
      if (confirm("Are you sure? Do you want to delete the details about the blog : " + name) === true) {
      this.dataService.onDeleteBlog(id).subscribe(response=>{
        console.log(response);
        if(JSON.parse(JSON.stringify(response)).response.message==="Blog Deleted Successfully." && JSON.parse(JSON.stringify(response)).response.statuscode === 200){

         // this.succMsg= name+" tag is deleted.";
          this.blogs=[];
          this.getBlogs();
          this.modalService.close("exampleModal")
        }
        else{
         alert(JSON.parse(JSON.stringify(response)).response.message);
        }
      })
      return true;

    }
    else {
      return false;
    }
  }

  getCategories(){
    this.dataService.getCategoriesWb().subscribe(element=>{
      let b = element.valueOf()
      this.categories=element.valueOf()
       
     if(this.categories['response']['data'])
    { this.categories=this.categories['response']['data'].valueOf();
      console.log('this.categories')
      console.log(this.categories)
      
          
      console.log(this.categories[0]);
      console.log(typeof(this.categories))
      }})
  }

  getTags() {

    this.dataService.getTags().subscribe(element => {
      this.tags = element.valueOf();

      this.tags = this.tags['response'];

      console.log(this.tags);
      console.log(typeof (this.tags))
    });
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
  });

  this.itemsRecords = this.blogs.length;
}

onDeleteImg(name:string,p:number){
  this.blog.images= this.blog.images.filter((item:any, index:number )=> index !== p);  console.log(this.blog.images)
}
onSubmit() {
  alert('Form Submitted succesfully!!!\n Check the values in browser console.');
  console.table(this.blog);
  console.log(JSON.stringify(this.blog));
  let params= this.blog 
  params.token=JSON.parse(sessionStorage.currentUser)[0].token;
  this.http.post(environment.apiUrl+'createBlog',JSON.stringify(params),{headers:new HttpHeaders({ 'Content-Type': 'application/json'})}).subscribe(resposne=>{
   console.table(resposne);
   console.log(JSON.stringify(resposne));
  })
}
}
