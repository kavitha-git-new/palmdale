import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/components/services/data.service';
import { ModalService } from 'src/app/components/_modal';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  items: any = [];
  itemsRecords: number = 0;
  page: number = 1;
  btnName: string = "Save";
  message: any = {};
  messages:any=[];
  title: string = "";
  titleDescription: string = "";
  constructor(private modalService:ModalService, private dataService:DataService) { }

  ngOnInit(): void {
    // this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`, description: `Item ${i + 1}` }));
    // this.itemsRecords = this.items.length;

    this.getMessages();
  }

  onView(id: number,name:string) {
    this.message.errMsg="";
    this.title="Edit";
    this.titleDescription="Edit details about the message to update.";
    this.btnName="Update"
    this.message.id=id;
    this.dataService.getMessage(id).subscribe(element=>
     { this.message=element});
    this.modalService.open('exampleModal');
    console.log(id);
  }

  onDelete(id: number,name:string) {
    console.log(id);
    this.dataService.getMessage(id).subscribe(element => {
      this.message = element;
    });

    if (confirm("Are you sure? Do you want to send message to : " + name) === true) {
    //  this.dataService.deletemessage(id);
      return true;
    }
    else {
      return false;
    }
  }

  onDownload() {
    //alert("Download started...");
    console.log("download started...");
  }

  onClose(id: string) {
    this.modalService.close(id)
  }

  saveData(btnName:string){
    alert("Save in Db");
  }

  getMessages(){
    this.dataService.getMessages().subscribe(element=>{
      
      this.messages= element.valueOf();
      
       this.messages= this.messages['response']['data'];
     
      console.log(this.messages);
      this.itemsRecords = this.messages.length;
     // console.log(JSON.parse(JSON.stringify(element))['response']);
    });
  }

}
