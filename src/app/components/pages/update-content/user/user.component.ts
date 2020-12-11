import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/components/services/data.service';
import { ModalService } from 'src/app/components/_modal';
import { allLetter, isEmailValid } from "../../../models/data-modal";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  items: any = [];
  itemsRecords: number = 0;
  page: number = 1;
  btnName: string = "Save";
  user: any = {};
  title: string = "";
  titleDescription: string = "";
  constructor(private modalService: ModalService, private dataService: DataService) { }

  ngOnInit(): void {
    this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`, description: `Item ${i + 1}` }));
    this.itemsRecords = this.items.length;
  }

  onEdit(id: number) {
    this.title="Edit";
    this.titleDescription="Edit details about the user to update.";
    this.btnName="Update"
    this.user.id=id;
    this.dataService.getTag(id).subscribe(element=>
     { this.user=element});
    this.modalService.open('exampleModal');
    console.log(id);
  }

  onAdd(btName: string) {
    this.title = "Add";
    this.titleDescription = "Add details about the user to save.";
    this.btnName = btName;
    this.user.id = 0;
    this.user.name = '';
    this.user.description = '';
    this.user.errMsg = '';
    this.modalService.open('exampleModal');
  }

  onClose(id: string) {
    this.modalService.close(id)
  }

  saveData(user: any, btnName: string) {
    if (user.fname === '' || allLetter(user.fname) === false || user.fname.length > 50) {
      user.errMsg = "Please provide valid details."
      return false;
    }
    else {
      user.errMsg = ""
    }
    if (user.lname === '' || allLetter(user.lname) === false || user.lname.length > 50) {
      user.errMsg = "Please provide valid details."
      return false;
    }
    else {
      user.errMsg = "";
    }
    if (user.mobile === '' || isNaN(user.mobile)) {
      alert(parseInt(user.mobile));
      user.errMsg = "Please provide valid details."
      return false;
    }
    else {
      user.errMsg = "";
    }

    if (user.email === '' || isEmailValid(user.email) === false || user.email.length > 50) {
      user.errMsg = "Please provide valid details."
      return false;
    }
    else {
      user.errMsg = "";
    }
   
    if (user.type === '' || allLetter(user.type) === false || user.type.length > 50 || user.type === 'N') {
      user.errMsg = "Please provide valid details."
      return false;
    }
    else {
      user.errMsg = "";
    }
   

    if (user.pwd === '' || user.newpwd === '' || user.pwd.length > 50 || user.newpwd.length > 50) {
      user.errMsg = "Please provide valid details."
      return false;
    }
    else if (user.pwd !== user.newpwd) {
      user.errMsg = "Please provide valid details."
      alert("Password must match.");
      return false;
    }
    else {
      user.errMsg = "";
    }
    if (user.fname !== '' && user.lname !== '' && user.email !== '' && user.type !== '' && parseInt(user.mobile) && user.pwd === user.newpwd) {
      if (btnName == 'Save' && this.btnName === 'Save') {
        this.dataService.saveUser(JSON.stringify(user));

        return true;
      }
      else {
        this.dataService.updateUser(JSON.stringify(user));
        return true;
      }


    }
    else {
      return false;
    }
  }

}
