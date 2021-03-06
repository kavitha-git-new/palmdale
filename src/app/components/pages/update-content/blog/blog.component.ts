import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DataService } from 'src/app/components/services/data.service';
import { ModalService } from 'src/app/components/_modal';
import { checkToken, isEmpty } from "../../../models/data-modal";
import { environment } from "../../../../../environments/environment";
import { FileUpload } from "../../../models/file-upload";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  items: any = [];
  itemsRecords: number = 0;
  page: number = 1;
  btnName: string = "Save";
  blog: any = {};
  searchText: string = "";
  tags: any = [];
  categories: any = [];
  blogs: any = [];
  item: any = [];
  title: string = "";
  titleDescription: string = "";
  errMsg: string = "";
  minDate: Date = new Date();
  selectedFiles: any;
  bsConfig: Partial<BsDatepickerConfig> = Object.assign({}, { containerClass: 'theme-blue' });

  theFiles: any[] = [];
  messages: string[] = [];
  MAX_SIZE: number = 1048576;
  constructor(private modalService: ModalService, private dataService: DataService, private http: HttpClient, private router: Router) {
    this.blog.images = []
    const token = document.getElementById("token");
    token?.setAttribute('value', JSON.parse(sessionStorage.currentUser)[0].token)
    console.log('token');
  }

  ngOnInit(): void {
    // this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`, description: `Item ${i + 1}` }));
    // this.itemsRecords = this.items.length;
    this.getBlogs();
    this.getCategories();
    this.getTags();
    // this.bsConfig = Object.assign({}, { containerClass: 'blue' });
    this.blog.dtPublished = new Date();
    console.log('Blogs :')
    console.log(this.blogs);

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
      if (this.blog['response']['message'] && checkToken(this.blog['response']['message'].toString()) === false) {
        alert("Please login again. Your session has expired.");
        this.router.navigate(['/login']);

      }
      else {
        this.blog = JSON.parse(JSON.stringify(this.blog['response'][0]));
        console.log(this.blog.id);
        console.log(typeof (this.blog));
      }

    });
    console.log(id);

    this.modalService.open('exampleModal');
  }

  onAdd(btName: string) {
    this.title = "Add";
    this.titleDescription = "Add details about the blog to save.";
    this.btnName = btName;
    this.blog.id = 0;
    this.blog.title = '';
    this.blog.isPublished = '';
    this.blog.description = '';
    this.blog.images = [];
    this.blog.category = '';
    this.blog.tag = '';
    this.errMsg = '';


    //to fill all the dropdowns

    this.modalService.open('exampleModal');
  }

  onSaveData() {
    alert("save date in Db.");

    console.log(this.blog);
    //this.uploadFile();
    if (this.blog.title === "" || this.blog.title === null) {
      alert("name")
      this.errMsg = "Please provide valid details.";
      return false;
    }
    else {
      this.errMsg = "";
    }
    if (this.blog.isPublished !== "T" && this.blog.isPublished !== 'F' || this.blog.isPublished === '') {
      alert("isPublished:" + this.blog.isPublished)
      this.errMsg = "Please provide valid details.";
      return false;
    }
    else {
      this.errMsg = "";
    }
    /* if(this.blog.dtPublished==='' || this.blog.dtPublished===null){
       alert("Date")
       this.errMsg="Please provide valid details.";
       return false;
     }
     else{
       this.errMsg="";
     }*/
    if (this.blog.category === '' || this.blog.tag === '') {
      alert("Category and Tag :" + this.blogs.category + " " + this.blog.tag)
      this.errMsg = "Please provide valid details.";
      return false;
    }
    else {
      this.errMsg = "";
    }
    if (this.blog.images.length === 0 || this.blog.images === null) {

      alert("Image");
      alert(this.blog.images.length);
      this.errMsg = "Please provide valid details.";
      return false;
    }
    else {
      this.errMsg = "";
    }
    if (this.blog.description === '' || this.blog.description === null) {
      alert("Description")
      this.errMsg = "Please provide valid details.";
      return false;
    }
    else {
      this.errMsg = "";
    }
    if (this.blog.title !== '' && this.blog.isPublished !== '' && this.blog.dtPublished && this.blog.tag.length > 0 && this.blog.category.length > 0 && this.blog.images.length > 0 && this.blog.description) {
      if (this.btnName === 'Save') {
        alert("Save")




        let params = this.blog;

        console.log(this.blog);

        //  console.log('params');
        //  console.log(JSON.stringify(params));

        // let temp =[];
        // for(let i=0;i<this.blog.images.length;i++){
        //   console.log(this.blog.images[i]['fileName'])
        //   temp.push(this.blog.images[i]['fileName']);
        // }
        // this.blog.images=temp;
        console.log(this.urls);
        params.token = JSON.parse(sessionStorage.currentUser)[0].token;
        console.log(params)
        params.urls = this.urls;
        var formData = new FormData();
        Object.keys(params).forEach((key) => {
          if (key === 'images') {
            console.log(typeof (params[key][0]))
            console.log(params[key].length);
            for (let i = 0; i < params[key].length; i++) {
              formData.append(key, JSON.stringify(params[key][i]));
            }

          } else {
            formData.append(key, params[key]);
          }
        });
        console.log(formData);
        //http://localhost:1337/api/palmdale/createBlog
        //  this.http.post(environment.apiUrl+'createBlog',formData,{headers: new HttpHeaders({ 'Content-Type': 'text/plain;charset=UTF-8'})}).subscribe(response=>{
        //x-www-form-urlencoded

        //this.http.post(environment.apiUrl+'createBlog',params,{headers: new HttpHeaders({ 'Content-Type': 'application/json'})}).subscribe(response=>{
        this.dataService.saveBlog(JSON.stringify(params)).subscribe(response => {
          console.log(response);
          console.log(typeof (response));
          if (isEmpty(response)) {
            this.errMsg = "Please try again."
            return false;
          }

          else if (response.hasOwnProperty('response') === false || JSON.parse(JSON.stringify(response)).response.message !== "Blog Created Successfully." || JSON.parse(JSON.stringify(response)).response.statuscode === 500 || JSON.parse(JSON.stringify(response)) === null || JSON.parse(JSON.stringify(response)).response.statuscode === 403) {

            this.errMsg = "Please try again."
            return false;
          }
          else {
            //  alert(JSON.parse(JSON.stringify(response)));

            if (JSON.parse(JSON.stringify(response)).response.message == "Blog Created Successfully." && JSON.parse(JSON.stringify(response)).response.statuscode === 200) {


              this.getBlogs();
              this.modalService.close("exampleModal")
              return true;
            }
            else {
              this.errMsg = "Please try again."
              return false;
            }
          }
        });
      }
      else {

        if (this.blog.id !== '' && this.btnName == 'Update') {
          this.dataService.updateBlog(JSON.stringify(this.blog)).subscribe(response => {
            console.log(response);
            if (isEmpty(response)) {
              this.errMsg = "Please try again."
              return false;
            }

            else if (response.hasOwnProperty('response') === false || JSON.parse(JSON.stringify(response)).response.statuscode === 403 || JSON.parse(JSON.stringify(response)).response.message !== "Blog Updated Successfully." || JSON.parse(JSON.stringify(response)).response.statuscode === 500 || JSON.parse(JSON.stringify(response)).response.message.name === 'The name has already been taken.') {
              this.errMsg = "Please try again."
              return false;
            }
            else {
              if (JSON.parse(JSON.stringify(response)).response.message == "Blog Updated Successfully." || JSON.parse(JSON.stringify(response)).response.statuscode === 200) {

                this.blogs = [];
                this.getBlogs();
                this.modalService.close("exampleModal");
                return true;
              }
              else {
                this.errMsg = "Please try again."
                return false;
              }
            }
          }, error => {
            console.log(error);
            this.errMsg = "Please try again."
            return false;
          })

        }
      }
      alert("Data to save in Db.");

      //  this.modalService.close("exampleModal")
      return true;
    }
    else {
      this.errMsg = "Please provide valid details.";
      return false;
    }


  }

  onSelectFile(event: any) {
    const files = event.target.files;
    let isImage = true;
    // console.log(event.target.files)
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

  onDelete(id: number, name: string) {
    console.log(id);
    if (confirm("Are you sure? Do you want to delete the details about the blog : " + name) === true) {
      this.dataService.onDeleteBlog(id).subscribe(response => {
        console.log(response);
        if (JSON.parse(JSON.stringify(response)).response.message === "Blog Deleted Successfully." && JSON.parse(JSON.stringify(response)).response.statuscode === 200) {

          // this.succMsg= name+" tag is deleted.";
          this.blogs = [];
          this.getBlogs();
          this.modalService.close("exampleModal")
        }
        else {
          alert(JSON.parse(JSON.stringify(response)).response.message);
        }
      }, error => {
        console.log(error);
        alert("Please try again.");
        return false;
      })
      return true;

    }
    else {
      return false;
    }
  }

  getCategories() {
    this.dataService.getCategoriesWb().subscribe(element => {
      this.categories = element.valueOf();
      // console.log(this.categories['response']['message'].toString());
      if (this.categories['response']['message'] && checkToken(this.categories['response']['message'].toString()) === false) {
        alert("Please login again. Your session has expired.");
        this.router.navigate(['/login']);

      }
      else {
        if (this.categories['response']['data']) {
          this.categories = this.categories['response']['data'].valueOf();
          console.log('this.categories')
          //  console.log(this.categories)


          //   console.log(this.categories[0]);
          console.log(typeof (this.categories))

        }

      }
    }, error => {
      // alert(error)
      console.log(error);
      alert("Please try again.");
      return false;
    })
  }

  getTags() {

    this.dataService.getTags().subscribe(element => {
      this.tags = element.valueOf();
      if (this.tags['response']['message'] && checkToken(this.tags['response']['message'].toString()) === false) {
        alert("Please login again. Your session has expired.");
        this.router.navigate(['/login']);

      }
      else {
        this.tags = this.tags['response'];

        console.log(this.tags);
        console.log(typeof (this.tags))
      }

    });
  }

  getBlogs() {
    this.dataService.getBlogsWb().subscribe(element => {
      let b = element.valueOf()
      this.blogs = element.valueOf()
      if (this.blogs['response']['message'] && checkToken(this.blogs['response']['message'].toString()) === false) {
        alert("Please login again. Your session has expired.");
        this.router.navigate(['/login']);

      }
      else {
        if (this.blogs['response']['data']) {
          this.blogs = this.blogs['response']['data'].valueOf();
          console.log('this.blogs')
          console.log(this.blogs)


          console.log(this.blogs[0]);
          console.log(typeof (this.blogs))
          console.log(this.blogs[0].category)
        }
        this.itemsRecords = this.blogs.length;
      }

    }, error => {
      console.log(error);
      alert("Please try again.");
      return false;
    });




  }

  onDeleteImg(name: string, p: number) {
    this.theFiles = this.theFiles.filter((item: any, index: number) => index !== p);
    console.log(this.blog.images)
  }
  onSubmit() {
    alert('Form Submitted succesfully!!!\n Check the values in browser console.');
    console.table(this.blog);
    console.log(JSON.stringify(this.blog));
    let params = this.blog
    params.token = JSON.parse(sessionStorage.currentUser)[0].token;
    this.http.post(environment.apiUrl + 'createBlog', JSON.stringify(params), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe(resposne => {
      console.table(resposne);
      console.log(JSON.stringify(resposne));
    })
  }

  onFileChange(event: any) {


    // Any file(s) selected from the input?
    if (event.target.files && event.target.files.length > 0) {
      for (let index = 0; index < event.target.files.length; index++) {
        let file = event.target.files[index];
        // Don't allow file sizes over 1MB
        if (file.size < this.MAX_SIZE) {
          // Add file to list of files
          this.theFiles.push(file);
        }
        else {
          this.messages.push("File: " + file.name + " is too large to upload.");
        }
      }
    }
    console.log("this.theFiles");
    console.log(typeof (this.theFiles));
  }

  uploadFile(): void {
    this.blog.images = [];
    for (let index = 0; index < this.theFiles.length; index++) {
      this.readAndUploadFile(this.theFiles[index]);
    }
    console.log("this.blog.images");
    console.log(this.blog.images);

  }

  private readAndUploadFile(theFile: any) {
    let file = new FileUpload();

    // Set File Information
    file.fileName = theFile.name;
    file.fileSize = theFile.size;
    file.fileType = theFile.type;
    file.lastModifiedTime = theFile.lastModified;
    file.lastModifiedDate = theFile.lastModifiedDate;

    // Use FileReader() object to get file to upload
    // NOTE: FileReader only works with newer browsers
    let reader = new FileReader();

    // Setup onload event for reader
    reader.onload = () => {
      // Store base64 encoded representation of file
      // file.fileAsBase64 = reader.result.toString();
      console.log(theFile);
      if (reader.result?.toString() !== undefined) {
        file.fileAsBase64 = reader?.result;
        console.log("upload file fn middle")
      }

      else alert(reader.result?.toString());
      /*  // POST to server
        this.uploadService.uploadFile(file).subscribe(resp => { 
            this.messages.push("Upload complete"); });*/

    }

    // Read the file
    reader.readAsDataURL(theFile);
    this.blog.images.push(file);
    console.log(reader);

  }

  displatValue(e: any) {
    let temp = JSON.parse(e)
    // console.log(e)  ;
    return temp;
  }

  urls = new Array<string>();

  detectFiles(event: any) {
    this.urls = [];
    this.blog.images = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
          this.blog.images.push(file.name)
        }
        reader.readAsDataURL(file);
      }
    }
  }

}
