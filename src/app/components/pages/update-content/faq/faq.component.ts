import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/components/services/data.service';
import { ModalService } from 'src/app/components/_modal';
import { checkToken, isEmpty } from "../../../models/data-modal";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  faqs:any=[];
  faq:any={};
  itemsRecords: number = 0;
  page: number = 1;
  btnName: string = "Save";
  errMsg: string = "";
  succMsg:string="";
  title: string = "";
  titleDescription: string = "";
  searchText:string="";
  constructor(private dataService:DataService, private router:Router, private modalService:ModalService) {
    //  this.faqs = Array(150).fill(0).map((x, i) => ({ id: (i + 1), title: `Item ${i + 1}`, description: `Item ${i + 1}`}));
    // this.itemsRecords=this.faqs.length;
   }

  ngOnInit(): void {

    this.getFAQs();
  }
  onEdit(id: number, title:string, description:string) {
    this.title = "Edit";
    this.titleDescription = "Edit details about the FAQs to update.";
    this.btnName = "Update"
    this.faq.id = id;
    this.faq.title=title;
    this.faq.description=description;
  //   this.dataService.getFAQ(id).subscribe(element => {
  //     this.faq = element.valueOf();
  //     if(this.faq['response']['message'] && checkToken(this.faq['response']['message'].toString())===false){
  //       alert("Please login again.  Your session expired.");
  //       this.router.navigate(['/login']); 
      
  //     }
  //     else{
  //       this.faq = JSON.parse(JSON.stringify(this.faq['response'][0]));
  //       console.log(this.faq.id);
  //       console.log(typeof (this.faq));
  //     }
     
  //   }, error => {
  //     // alert(error)
  //      console.log( error);
  //      this.errMsg = "Please try again."
  //      return false;
  //  });
    this.modalService.open('exampleModal');
    console.log(id);
  }

  onDelete(id:number,name:string) {
   
    console.log(id)

    if (confirm("Are you sure? Do you want to delete the details about the FAQ : " + name) === true) {
      this.dataService.deleteFAQ(id).subscribe(response=>{
        
        console.log(response);
        if(JSON.parse(JSON.stringify(response)).response.message && checkToken(JSON.parse(JSON.stringify(response)).response.message.toString())===false){

          alert("Please login again.  Your session expired.");
          this.router.navigate(['/login']); 
          return false;
         
        }
        else{
          if(JSON.parse(JSON.stringify(response)).response.message==="FAQ Deleted Successfully." && JSON.parse(JSON.stringify(response)).response.statuscode === 200){

            this.succMsg= name+" tag is deleted.";
            this.faq=[];
            this.getFAQs();
            this.modalService.close("exampleModal");
            return true;
          }
          else{
           alert("Please try again.");
           return false;
          }
        }
        
      },error => {
        // alert(error)
         console.log( error);
         alert("Please try again.");
         return false;
     });
      return true;

    }
    else {
      return false;
    }
  }

  onAdd(btName: string) {
    this.title = "Add";
    this.titleDescription = "Add details about the FAQ to save.";
    this.btnName = btName;
    this.faq.id = 0;
    this.faq.title = '';
    this.faq.description = '';
    this.errMsg = '';
    this.modalService.open('exampleModal');
  }

  saveData(btName: string) {
    this.errMsg = "";
    if (this.faq.title === '' || this.faq.title.length > 111) {
      this.errMsg = "Please provide valid details."
      return false;
    }
    else {
      this.errMsg = "";
    }
    if (this.faq.description === '') {
      this.errMsg = "Please provide valid details."
      return false;
    }
    else if (this.faq.description !== '' && this.faq.description.toString().length>590) {
      this.errMsg = "Please provide less than 480 characters in Description."
      return false;
    }
    else {
      this.errMsg = "";
    }
    

    if (this.faq.title !== '' && this.faq.description !== "" && confirm("Are you sure ? Do you want to save the details of " + this.faq.title) === true) {
      if (this.btnName === 'Save' || btName === 'Save') {
        this.dataService.saveFAQ(JSON.stringify(this.faq)).subscribe(response => 
          {
          alert(response);
          if (isEmpty(response)){
            this.errMsg = "Please try again."
            return false;
          } 
          
          else if(response.hasOwnProperty('response')===false ||JSON.parse(JSON.stringify(response)).response.message && checkToken(JSON.parse(JSON.stringify(response)).response.message.toString())===false){

            alert("Please login again.  Your session expired.");
            this.router.navigate(['/login']); 
            return false;
           
          }
          else{
            if (JSON.parse(JSON.stringify(response)).response.statuscode === 403 || JSON.parse(JSON.stringify(response)).response.message.name === 'The name has already been taken.') {
              this.errMsg = "Please try again."
              return false;
            }
            else{
              if(JSON.parse(JSON.stringify(response)).response.message=="FAQ Created Successfully."){
  
                this.succMsg= this.faq.title+" tag is saved";
                this.faq={};
                this.faqs=[];
                this.getFAQs();
                this.modalService.close("exampleModal");
                return true;
              }
              else{
                this.errMsg="Please try again."
                return false;
              }
            }
          }
          
        },
        error => {
         // alert(error)
          console.log( error);
          this.errMsg = "Please try again."
          return false;
      }
        );
        
      }
      else {
        if (this.faq.id !== '') { this.dataService.updateFAQ(JSON.stringify(this.faq)).subscribe(response => {
          console.log(response);
          if (isEmpty(response)){
            this.errMsg = "Please try again."
            return false;
          } 
          
          if(response.hasOwnProperty('response')===false){
            this.errMsg = "Please try again."
            return false;
          }
          if( JSON.parse(JSON.stringify(response)).response.message && checkToken(JSON.parse(JSON.stringify(response)).response.message.toString())===false){

            alert("Please login again.  Your session expired.");
            this.router.navigate(['/login']); 
            return false;
           
          }
          else{
            if (JSON.parse(JSON.stringify(response)).response.statuscode === 403 || JSON.parse(JSON.stringify(response)).response.message.name === 'The name has already been taken.') {
              this.errMsg = "Please try again.";
              return false;
            }
            else{
              if(JSON.parse(JSON.stringify(response)).response.message=="FAQ Updated Successfully." || JSON.parse(JSON.stringify(response)).response.statuscode === 200 ){
  
                this.succMsg= this.faq.title+" FAQ is saved";
                this.faqs=[];
                this.getFAQs();
                this.modalService.close("exampleModal");
                return true;
              }
              else{
                this.errMsg="Please try again.";
                return false;
              }
            }
          }
         
        }, error => {
          // alert(error)
           console.log( error);
           this.errMsg = "Please try again."
           return false;
       }) }
      }
      alert("Data to save in Db.");


     
      return true;
    }
    else {
      return false;
    }



  }

  onClose(id: string) {
    this.modalService.close(id)
  }
  getFAQs(){
    this.dataService.getFAQs().subscribe(element=>{
      
      this.faqs= element.valueOf();
      console.log(this.faqs['response']['message']);
      if(this.faqs['response']['message'] && checkToken(this.faqs['response']['message'].toString())===false){
        alert("Please login again. Your session has expired.");
        this.router.navigate(['/login']); 
       
      }
      else{
      
        if (this.faqs['response']['data']) {
          this.faqs = this.faqs['response']['data'].valueOf();
          console.log('this.blogs')
          console.log(this.faqs)


          console.log(this.faqs[0]);
          console.log(typeof (this.faqs))
          console.log(this.faqs[0].category)
        }
        this.itemsRecords = this.faqs.length;

      }
       
     // console.log(JSON.parse(JSON.stringify(element))['response']);
    }, error => {
      // alert(error)
       console.log( error);
       this.errMsg = "Please try again."
       return false;
   });
  }

}
