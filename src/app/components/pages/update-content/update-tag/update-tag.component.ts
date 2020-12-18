import { Component, OnInit } from '@angular/core';
import { ModalService } from "../../../_modal/modal.service";
import { allLetter } from "../../../models/data-modal";
import { DataService } from "../../../services/data.service"
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
  constructor(private modalService: ModalService, private dataService: DataService) {
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

      this.tag = JSON.parse(JSON.stringify(this.tag['response'][0]));
      console.log(this.tag.id);
      console.log(typeof (this.tag));
    });
    this.modalService.open('exampleModal');
    console.log(id);
  }

  onDelete(id:number,name:string) {
   
    console.log(id)

    if (confirm("Are you sure? Do you want to delete the details about the tag : " + name) === true) {
      this.dataService.deleteTag(id).subscribe(response=>{
        console.log(response);
        if(JSON.parse(JSON.stringify(response)).response.message==="Tag Deleted Successfully." && JSON.parse(JSON.stringify(response)).response.statuscode === 200){

          this.succMsg= name+" tag is deleted.";
          this.tag=[];
          this.getTags();
          this.modalService.close("exampleModal")
        }
        else{
         alert(JSON.parse(JSON.stringify(response)).response.message);
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
          console.log(response);
          if (JSON.parse(JSON.stringify(response)).response.statuscode === 403 || JSON.parse(JSON.stringify(response)).response.message.name === 'The name has already been taken.') {
            this.errMsg = "Please try again."
          }
          else{
            if(JSON.parse(JSON.stringify(response)).response.message=="Tag Created Successfully."){

              this.succMsg= this.tag.name+" tag is saved";
              this.tag=[];
              this.getTags();
              this.modalService.close("exampleModal")
            }
            else{
              this.errMsg="Please try again."
            }
          }
        });
      }
      else {
        if (this.tag.id !== '') { this.dataService.updateTag(JSON.stringify(this.tag)).subscribe(response => {
          console.log(response);
          if (JSON.parse(JSON.stringify(response)).response.statuscode === 403 || JSON.parse(JSON.stringify(response)).response.message.name === 'The name has already been taken.') {
            this.errMsg = "Please try again."
          }
          else{
            if(JSON.parse(JSON.stringify(response)).response.message=="Tag Updated Successfully." || JSON.parse(JSON.stringify(response)).response.statuscode === 200 ){

              this.succMsg= this.tag.name+" tag is saved";
              this.tag=[];
              this.getTags();
              this.modalService.close("exampleModal")
            }
            else{
              this.errMsg="Please try again."
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

      this.tags = this.tags['response'];

      console.log(this.tags);
      this.itemsRecords = this.tags.length;
      console.log(typeof (this.tags))
    });


  }
}
