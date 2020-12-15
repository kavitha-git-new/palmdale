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
    this.user.errMsg="";
    this.title="Edit";
    this.titleDescription="Edit details about the user to update.";
    this.btnName="Update"
    this.user.id=id;
    this.dataService.getTag(id).subscribe(element=>
     { this.user=element});
    this.modalService.open('exampleModal');
    console.log(id);
  }

  onDelete(id: number) {
    console.log(id);
    this.dataService.getBlog(id).subscribe(element => {
      this.user = element;
    });

    if (confirm("Are you sure? Do you want to delete the details about the user : " + this.user.name) === true) {
      this.dataService.deleteUser(id);
      return true;

    }
    else {
      return false;
    }
  }

  onAdd(btName: string) {
    this.title = "Add";
    this.titleDescription = "Add details about the user to save.";
    this.btnName = btName;
    this.user.id = 0;
    this.user.fname = '';
    this.user.lname = '';
    this.user.errMsg = '';
    this.modalService.open('exampleModal');
  }

  onClose(id: string) {
    this.modalService.close(id)
  }

  saveData(btnName: string) {
    console.log('user')
    console.log(this.user);
    console.log(parseInt(this.user.mobile));
    if (this.user.fname === '' || allLetter(this.user.fname) === false || this.user.fname.length > 50) {
      this.user.errMsg = "Please provide valid details."
      return false;
    }
    else {
      this.user.errMsg = ""
    }
    if (this.user.lname === '' || allLetter(this.user.lname) === false || this.user.lname.length > 50) {
      this.user.errMsg = "Please provide valid details."
      return false;
    }
    else {
      this.user.errMsg = "";
    }
    if (this.user.mobile === '' || isNaN(this.user.mobile)) {
     // alert(parseInt(user.mobile));
     this.user.errMsg = "Please provide valid details."
      return false;
    }
    else {
      this.user.errMsg = "";
    }

    if (this.user.email === '' || isEmailValid(this.user.email) === false || this.user.email.length > 50) {
      this.user.errMsg = "Please provide valid details."
      return false;
    }
    else {
      this.user.errMsg = "";
    }
   
    if (this.user.role === '' || allLetter(this.user.role) === false || this.user.role.length > 50 || this.user.role === 'N') {
      this.user.errMsg = "Please provide valid details."
      return false;
    }
    else {
      this.user.errMsg = "";
    }
   

    if (this.user.pwd === '' || this.user.newpwd === '' || this.user.pwd.length > 50 || this.user.newpwd.length > 50) {
      this.user.errMsg = "Please provide valid details."
      return false;
    }
    if (this.user.pwd !== this.user.newpwd) {
      this.user.errMsg = "Please provide valid details."
      alert("Password must match.");
      return false;
    }
    else {
      this.user.errMsg = "";
    }
    if (this.user.fname !== '' && this.user.lname !== '' && this.user.email !== '' && this.user.role !== '' && parseInt(this.user.mobile) && this.user.pwd === this.user.newpwd  && confirm("Are you sure ? Do you want to save the details of "+this.user.name)===true) {
      if (btnName == 'Save' && this.btnName === 'Save') {
        this.dataService.saveUser(JSON.stringify(this.user));

        return true;
      }
      else {
        this.dataService.updateUser(JSON.stringify(this.user));
        return true;
      }


    }
    else {
      return false;
    }
  }

}
