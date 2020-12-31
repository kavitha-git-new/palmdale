import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/components/services/data.service';
import { ModalService } from 'src/app/components/_modal';
import {allLetter, checkToken} from "../../../models/data-modal";

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

itemsRecords:number=0;
page:number=1;
categories:any=[];
category:any={};
//categories detail
title:string="Add";
errMsg:string="";
titleDescription:string="Add details about the categorys to save.";
btnName:string="Save";
  constructor(private modalService:ModalService, private dataService:DataService, private router:Router) { }

  ngOnInit(): void {
    
    this.getCategory();
  }

  onEdit(id:number){
    this.title="Edit";
    this.titleDescription="Edit details about the categoriess to update.";
    this.btnName="Update"
    this.category.id = id;
    this.dataService.getCategory(id).subscribe(element => {
      this.category = element.valueOf();
      if(this.category['response']['message'] && checkToken(this.category['response']['message'].toString())===false){
        alert("Please login again.  Your session expired.");
        this.router.navigate(['/login']); 
       
      }
      else{
        this.category = JSON.parse(JSON.stringify(this.category['response'][0]));
        console.log(this.category.id);
        console.log(typeof (this.category));
        this.modalService.open('exampleModal');
        console.log(id);
      }
      
    });
  
  }

  onDelete(id: number,name:string) {
    console.log(id);
    
//delCat
    if (confirm("Are you sure? Do you want to delete the details about the category : " + name) === true) {
      this.dataService.deleteCategory(id).subscribe(response=>{
        if(JSON.parse(JSON.stringify(response)).response.message && checkToken(JSON.parse(JSON.stringify(response)).response.message.toString())===false){

          alert("Please login again. Your session has expired.");
          this.router.navigate(['/login']); 
          return false;
         
        }
        else{
          console.log(response);
        if(JSON.parse(JSON.stringify(response)).response.message==="Category Deleted Successfully." && JSON.parse(JSON.stringify(response)).response.statuscode === 200){

         // this.succMsg= name+" tag is deleted.";
          this.categories=[];
          this.getCategory();
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

  onAdd(btName:string){
    this.title="Add";
    this.titleDescription="Add details about the categories to save.";
    this.btnName=btName;
    this.category.id=0;
    this.category.name='';
    this.category.description='';
    this.errMsg='';
    this.modalService.open('exampleModal');
  }

  saveData(category:any,btName:string){
    this.errMsg="";
    if(category.name===''|| allLetter(category.name)===false || category.name.length>50)
    {
      this.errMsg="Please provide valid details."
      return false;
    }
    else{
      this.errMsg=""
    }
    if(category.description===''|| category.description===null){
      this.errMsg="Please provide valid details."
      return false;
    }
    else{
      this.errMsg=""; 
    }
    if(category.name!=='' && category.description!=="" && confirm("Are you sure ? Do you want to save the details of "+category.name)===true){
        if(this.btnName==='Save' || btName==='Save')
        {
          //to save the detais
          this.dataService.saveCategory(JSON.stringify(category)).subscribe(response => {
            console.log(response);
            if (JSON.parse(JSON.stringify(response)).response.statuscode === 403 || JSON.parse(JSON.stringify(response)).response.message.name === 'The name has already been taken.') {
              this.errMsg = "Please try again."
            }
            else{
            //  alert(JSON.parse(JSON.stringify(response)));
              if(JSON.parse(JSON.stringify(response)).response.message=="Category Created Successfully."){
  
               // this.succMsg= this.tag.name+" tag is saved";
                this.category=[];
                this.getCategory();
                this.modalService.close("exampleModal")
              }
              else{
                this.errMsg="Please try again."
              }
            }
          });;
        }
        else{
          //to update the detais
          if(category.id!=='')
          {
            this.dataService.updateCategory(JSON.stringify(category)).subscribe(response => {
            console.log(response);
            if (JSON.parse(JSON.stringify(response)).response.statuscode === 403 || JSON.parse(JSON.stringify(response)).response.message.name === 'The name has already been taken.') {
              this.errMsg = "Please try again."
            }
            else{
              if(JSON.parse(JSON.stringify(response)).response.message=="Category Updated Successfully." || JSON.parse(JSON.stringify(response)).response.statuscode === 200 ){
  
              //  this.succMsg= this.tag.name+" tag is saved";
                this.category=[];
                this.getCategory();
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
         return false;
       }
    
    
    
  }

  onClose(id:string){
    this.modalService.close(id)
    }

    getCategory() {

      this.dataService.getCategories().subscribe(element => {
        this.categories = element.valueOf();
        if(this.categories['response']['message'] && checkToken(this.categories['response']['message'].toString())===false){
          alert("Please login again. Your session has expired.");
          this.router.navigate(['/login']); 
         
        }
        else{
          this.categories = this.categories['response'];
  
          console.log(this.categories);
          this.itemsRecords = this.categories.length;
          console.log(typeof (this.categories))
        }
        
      });
      
  
    }

}
