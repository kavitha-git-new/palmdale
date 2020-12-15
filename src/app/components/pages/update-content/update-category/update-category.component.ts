import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/components/services/data.service';
import { ModalService } from 'src/app/components/_modal';
import {allLetter, Tag} from "../../../models/data-modal";

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
items:any=[];
itemsRecords:number=0;
page:number=1;
 
category:any={};
//categories detail
title:string="Add";
titleDescription:string="Add details about the categorys to save.";
btnName:string="Save";
  constructor(private modalService:ModalService, private dataService:DataService) { }

  ngOnInit(): void {
    this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`, description: `Item ${i + 1}`}));
    this.itemsRecords=this.items.length;
  }

  onEdit(id:number){
    this.title="Edit";
    this.titleDescription="Edit details about the categoriess to update.";
    this.btnName="Update"
    this.dataService.getCategory(id).subscribe(element=>
     { this.category=element});
    this.modalService.open('exampleModal');
    console.log(id);
  }

  onDelete(id: number) {
    console.log(id);
    this.dataService.getBlog(id).subscribe(element => {
      this.category = element;
    });

    if (confirm("Are you sure? Do you want to delete the details about the category : " + this.category.name) === true) {
      this.dataService.deleteCategory(id);
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
    this.category.errMsg='';
    this.modalService.open('exampleModal');
  }

  saveData(category:any,btName:string){

    if(category.name===''|| allLetter(category.name)===false || category.name.length>50)
    {
      category.errMsg="Please provide valid details."
      return false;
    }
    else{
      category.errMsg=""
    }
    if(category.description===''|| allLetter(category.description)===false){
      category.errMsg="Please provide valid details."
      return false;
    }
    else{
      category.errMsg=""; 
    }
    if(category.name!=='' && category.description!=="" && confirm("Are you sure ? Do you want to save the details of "+category.name)===true){
        if(this.btnName==='Save' || btName==='Save')
        {
          //to save the detais
          this.dataService.saveCategory(JSON.stringify(category));
        }
        else{
          //to update the detais
          if(category.id!=='')
          {this.dataService.updateCategory(JSON.stringify(category))}
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

}
