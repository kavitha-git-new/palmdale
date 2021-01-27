import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { DataService } from 'src/app/components/services/data.service';
import { ExcelFileService } from 'src/app/components/services/excel-file.service';
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
  searchText:string="";
  titleDescription: string = "";
  constructor(private modalService:ModalService, private dataService:DataService, private excelService:ExcelFileService) { }

  ngOnInit(): void {
    // this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`, description: `Item ${i + 1}` }));
    // this.itemsRecords = this.items.length;

    this.getMessages();
  }

  onView(id: number,name:string, email:string, mobile:string,message:string,dt:Date) {
    this.message.errMsg="";
    this.title="View Message";
    this.titleDescription="View details about the message.";
    this.btnName="Update"
    this.message.id=id;
    this.messages.name=name;
    this.message.email=email;
    this.message.mobile=mobile;
    this.message.message=message;
    console.log(new Date(dt).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'}));
    this.message.date=new Date(dt).toLocaleDateString('en-US',{day:'numeric',month:'long',year:'numeric'});
    this.dataService.getMessage(id).subscribe(element=>
     { this.message=element});
    this.modalService.open('exampleModal');
    console.log(id);
  }

  onMessage(id: number,name:string,email:string) {
    console.log(id);
    this.dataService.getMessage(id).subscribe(element => {
      this.message = element;
    });

    if (confirm("Are you sure? Do you want to send message to : " + name) === true) {
    //  send message to client:
    this.dataService.sendMessageToClient(JSON.stringify({id:id,name:name,email:email})).subscribe((response:any)=>{
      console.log("Response for sending msg.");
      console.log(response);
    },(error:any)=>{
      console.error(error);
      alert("Please try again.");
      return false;
    });
    
      return true;
    }
    else {
      return false;
    }
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

  onDownload() {
    let new_list = this.messages.map(function(obj:any) {
      return {
        serial_no: obj.serial_no,
        name: obj.name,
        email: obj.email,
        mobile: obj.mobile,
        message: obj.message        
      }
    });
    this.excelService.exportAsExcelFile(new_list, 'message_list');  

  } 

}
