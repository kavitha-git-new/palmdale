import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/components/services/data.service';
import { ModalService } from 'src/app/components/_modal';
import { allLetter } from "src/app/components/models/data-modal";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  items: any = [];
  itemsRecords: number = 0;
  page: number = 1;
  btnName: string = "Save";
  item: any = {};
  title: string = "";
  titleDescription: string = "";
  constructor(private modalService:ModalService, private dataService:DataService) { }

  ngOnInit(): void {
    this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`, description: `Item ${i + 1}` }));
    this.itemsRecords = this.items.length;
  }

  onEdit(id: number) {
    this.item.errMsg="";
    this.title="Edit";
    this.titleDescription="Edit details about the item to update.";
    this.btnName="Update"
    this.item.id=id;
    this.dataService.getItem(id).subscribe(element=>
     { this.item=element});
    this.modalService.open('exampleModal');
    console.log(id);
  }

  onAdd(btName: string) {
    this.title = "Add";
    this.titleDescription = "Add details about the item to save.";
    this.btnName = btName;
    this.item.id = 0;
    this.item.name = '';
    this.item.description = '';
    this.item.errMsg = '';
    this.modalService.open('exampleModal');
  }

  onClose(id: string) {
    this.modalService.close(id)
  }

  saveData(item: any, btnName: string) {
  
    if(item.name===''|| allLetter(item.name)===false || item.name.length>50) 
    {
      item.errMsg="Please provide valid details."
      return false;
    }
    else{
      item.errMsg="";
    }
    if(item.description===''|| allLetter(item.description)===false){
      item.errMsg="Please provide valid details."
      return false;
    }
    else{
      item.errMsg="";
    }
   
      if(item.name!=='' && item.description!=="" && confirm("Are you sure ? Do you want to save the details of "+item.name)===true){
        if(this.btnName==='Save' || btnName==='Save')
        {
          this.dataService.saveItem(JSON.stringify(item));
        }
        else{
          if(item.id!=='')
          {this.dataService.updateItem(JSON.stringify(item))}
        }      
   
       this.modalService.close("exampleModal")
         return true;
       }
       else{
         return false;
       }
   
  }



}
