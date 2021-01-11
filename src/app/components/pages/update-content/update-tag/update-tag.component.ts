import { Component, OnInit } from '@angular/core';
import { ModalService } from "../../../_modal/modal.service";
import { checkToken, isEmpty } from "../../../models/data-modal";
import { DataService } from "../../../services/data.service"
import { Router } from "@angular/router";
@Component({
  selector: 'app-update-tag',
  templateUrl: './update-tag.component.html',
  styleUrls: ['./update-tag.component.css']
})
export class UpdateTagComponent implements OnInit {

  itemsRecords: number = 0;
  page: number = 1;
  btnName: string = "Save";
  tag: any = {};
  tags: any = [];
  errMsg: string = "";
  succMsg:string="";
  title: string = "";
  titleDescription: string = "";

  searchText:string="";
  constructor(private modalService: ModalService, private dataService: DataService, private router :Router) {
    //  this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`, description: `Item ${i + 1}`}));
    // this.itemsRecords=this.items.length;
  }

  ngOnInit(): void {
    this.getTags();
  }

  onEdit(id: number) {
    this.title = "Edit";
    this.titleDescription = "Edit details about the tags to update.";
    this.btnName = "Update"
    this.tag.id = id;
    this.dataService.getTag(id).subscribe(element => {
      this.tag = element.valueOf();
      if(this.tag['response']['message'] && checkToken(this.tag['response']['message'].toString())===false){
        alert("Please login again.  Your session expired.");
        this.router.navigate(['/login']); 
      
      }
      else{
        this.tag = JSON.parse(JSON.stringify(this.tag['response'][0]));
        console.log(this.tag.id);
        console.log(typeof (this.tag));
      }
     
    });
    this.modalService.open('exampleModal');
    console.log(id);
  }

  onDelete(id:number,name:string) {
   
    console.log(id)

    if (confirm("Are you sure? Do you want to delete the details about the tag : " + name) === true) {
      this.dataService.deleteTag(id).subscribe(response=>{
        console.log(response);
        if(JSON.parse(JSON.stringify(response)).response.message && checkToken(JSON.parse(JSON.stringify(response)).response.message.toString())===false){

          alert("Please login again.  Your session expired.");
          this.router.navigate(['/login']); 
          return false;
         
        }
        else{
          if(JSON.parse(JSON.stringify(response)).response.message==="Tag Deleted Successfully." && JSON.parse(JSON.stringify(response)).response.statuscode === 200){

            this.succMsg= name+" tag is deleted.";
            this.tag=[];
            this.getTags();
            this.modalService.close("exampleModal");
            return true;
          }
          else{
           alert("Please try again.");
           return false;
          }
        }
        
      });
      return true;

    }
    else {
      return false;
    }
  }

  onAdd(btName: string) {
    this.title = "Add";
    this.titleDescription = "Add details about the tags to save.";
    this.btnName = btName;
    this.tag.id = 0;
    this.tag.name = '';
    this.tag.description = '';
    this.errMsg = '';
    this.modalService.open('exampleModal');
  }

  saveData(btName: string) {
    this.errMsg = "";
    if (this.tag.name === '' || this.tag.name.length > 50) {
      this.errMsg = "Please provide valid details."
      return false;
    }
    else {
      this.errMsg = "";
    }
    if (this.tag.description === '') {
      this.errMsg = "Please provide valid details."
      return false;
    }
    else {
      this.errMsg = "";
    }

    if (this.tag.name !== '' && this.tag.description !== "" && confirm("Are you sure ? Do you want to save the details of " + this.tag.name) === true) {
      if (this.btnName === 'Save' || btName === 'Save') {
        this.dataService.saveTag(JSON.stringify(this.tag)).subscribe(response => {
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
              if(JSON.parse(JSON.stringify(response)).response.message=="Tag Created Successfully."){
  
                this.succMsg= this.tag.name+" tag is saved";
                this.tag={};
                this.tags=[];
                this.getTags();
                this.modalService.close("exampleModal");
                return true;
              }
              else{
                this.errMsg="Please try again."
                return false;
              }
            }
          }
          
        });
      }
      else {
        if (this.tag.id !== '') { this.dataService.updateTag(JSON.stringify(this.tag)).subscribe(response => {
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
              if(JSON.parse(JSON.stringify(response)).response.message=="Tag Updated Successfully." || JSON.parse(JSON.stringify(response)).response.statuscode === 200 ){
  
                this.succMsg= this.tag.name+" tag is saved";
                this.tag=[];
                this.getTags();
                this.modalService.close("exampleModal");
                return true;
              }
              else{
                this.errMsg="Please try again.";
                return false;
              }
            }
          }
         
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

  getTags() {

    this.dataService.getTags().subscribe(element => {
      this.tags = element.valueOf();
      if (isEmpty(element)){
        this.errMsg = "Please try again."
        return false;
      } 

     
      if(element.hasOwnProperty('response')===false || this.tags['response']['message'] && checkToken(this.tags['response']['message'].toString())===false){
        alert("Please login again. Your session has expired.");
        this.router.navigate(['/login']); 
       
      }
      else{
        this.tags = this.tags['response'];

        console.log(this.tags);
        this.itemsRecords = this.tags.length;
        console.log(typeof (this.tags))
        this.itemsRecords=this.tags.length;
      }
      return true;
    });


  }
}
