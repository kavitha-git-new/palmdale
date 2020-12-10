import { Component, OnInit } from '@angular/core';
import { ModalService } from "../../../_modal/modal.service";

@Component({
  selector: 'app-update-tag',
  templateUrl: './update-tag.component.html',
  styleUrls: ['./update-tag.component.css']
})
export class UpdateTagComponent implements OnInit {
  items:any=[];
itemsRecords:number=0;
page:number=1;
btnName:string="";
tag:any={};
title:string="";
titleDescription:string="";
  constructor(private modalService:ModalService) {
    this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`, description: `Item ${i + 1}`}));
    this.itemsRecords=this.items.length;
   }

  ngOnInit(): void {
  }

  onEdit(id:number){
    this.title="Edit";
    this.titleDescription="Edit details about the tags to update.";
    this.btnName="Update"
    this.modalService.open('exampleModal')
    console.log(id);
  }



  saveData(tag:any,btName:string){
    alert("Data to save in Db.");

    this.modalService.close("exampleModal")

  }

  onClose(id:string){
    this.modalService.close(id)
    }

}
