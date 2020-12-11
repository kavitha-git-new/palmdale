import { Component, OnInit } from '@angular/core';
import { ModalService } from "../../../_modal/modal.service";
import {allLetter} from "../../../models/data-modal";
import {DataService} from "../../../services/data.service"
@Component({
  selector: 'app-update-tag',
  templateUrl: './update-tag.component.html',
  styleUrls: ['./update-tag.component.css']
})
export class UpdateTagComponent implements OnInit {
  items:any=[];
itemsRecords:number=0;
page:number=1;
btnName:string="Save";
tag:any={};
title:string="";
titleDescription:string="";
  constructor(private modalService:ModalService, private dataService:DataService) {
    this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`, description: `Item ${i + 1}`}));
    this.itemsRecords=this.items.length;
   }

  ngOnInit(): void {
   // this.dataService.get();
  }

  onEdit(id:number){
    this.title="Edit";
    this.titleDescription="Edit details about the tags to update.";
    this.btnName="Update"
    this.tag.id=id;
    this.dataService.getTag(id).subscribe(element=>
     { this.tag=element});
    this.modalService.open('exampleModal');
    console.log(id);
  }

  onAdd(btName:string){
    this.title="Add";
    this.titleDescription="Add details about the tags to save.";
    this.btnName=btName;
    this.tag.id=0;
    this.tag.name='';
    this.tag.description='';
    this.tag.errMsg='';
    this.modalService.open('exampleModal');
  }

  saveData(tag:any,btName:string){

    if(tag.name===''|| allLetter(tag.name)===false || tag.name.length>50) 
    {
      tag.errMsg="Please provide valid details."
      return false;
    }
    else{
      tag.errMsg="";
    }
    if(tag.description===''|| allLetter(tag.description)===false){
      tag.errMsg="Please provide valid details."
      return false;
    }
    else{
      tag.errMsg="";
    }
   
      if(tag.name!=='' && tag.description!==""){
        if(this.btnName==='Save' || btName==='Save')
        {
          this.dataService.saveTag(JSON.stringify(tag));
        }
        else{
          if(tag.id!=='')
          {this.dataService.updateTag(JSON.stringify(tag))}
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
