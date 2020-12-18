import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
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
  succMsg:string="";
  errMsg:string=""
  title: string = "";
  titleDescription: string = "";
  users:any =[]
  constructor(private modalService: ModalService, private dataService: DataService) { 
   // this.getUsers();
  }

  ngOnInit(): void {
    this.getUsers();
    
  }

  onEdit(id: number) {
    this.errMsg="";
    this.title="Edit";
    this.titleDescription="Edit details about the user to update.";
    this.btnName="Update"
    this.user.id=id;
    this.dataService.getUser(id).subscribe(element=>
      
     { //this.user=element
      this.user= element.valueOf();
      
     this.user= JSON.parse(JSON.stringify(this.user['response'][0]));
      console.log(this.user.id);
      console.log(typeof(this.user));
    
    });
    this.modalService.open('exampleModal');
    console.log(id);
  }

  onDelete(id: number,fname:string,lname:string) {
    console.log(id);
    this.dataService.getUser(id).subscribe(element => {
      this.user = element;
      console.log(this.users)
    });

    if (confirm("Are you sure? Do you want to delete the details about the user : " + fname+' '+lname) === true) {
      this.dataService.deleteUser(id).subscribe(response=>{
        if(JSON.parse(JSON.stringify(response)).response.message==="User Delete Successfully." && JSON.parse(JSON.stringify(response)).response.statuscode === 200){

          this.succMsg= this.user.fname+" "+this.user.lname+" details is deleted.";
          this.users=[];
          this.getUsers();
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
    this.titleDescription = "Add details about the user to save.";
    this.btnName = btName;
    this.user.id = 0;
    this.user.fname = '';
    this.user.lname = '';
    this.user.email='';
    this.user.mobile='';
    this.errMsg = '';
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
      this.errMsg = "Please provide valid details."
      return false;
    }
    else {
      this.errMsg = ""
    }
    if (this.user.lname === '' || allLetter(this.user.lname) === false || this.user.lname.length > 50) {
      this.errMsg = "Please provide valid details."
      return false;
    }
    else {
      this.errMsg = "";
    }
    if (this.user.mobile === '' || isNaN(this.user.mobile)) {
     // alert(parseInt(user.mobile));
     this.errMsg = "Please provide valid details."
      return false;
    }
    else {
      this.errMsg = "";
    }

    if (this.user.email === '' || isEmailValid(this.user.email) === false || this.user.email.length > 50) {
      this.errMsg = "Please provide valid details."
      return false;
    }
    else {
      this.errMsg = "";
    }
   
    if (this.user.role === '' || allLetter(this.user.role) === false || this.user.role.length > 50 || this.user.role === '') {
      this.errMsg = "Please provide valid details."
      return false;
    }
    else {
      this.errMsg = "";
    }
   

    if (this.user.password === '' || this.user.newpwd === '' || this.user.password.length > 50 || this.user.newpwd.length > 50) {
      this.errMsg = "Please provide valid details."
      return false;
    }
    if (this.user.password !== this.user.newpwd) {
      this.errMsg = "Please provide valid details."
      alert("Password must match.");
      return false;
    }
    else {
      this.errMsg = "";
    }
    if (this.user.fname !== '' && this.user.lname !== '' && this.user.email !== '' && this.user.role !== '' && parseInt(this.user.mobile) && this.user.password === this.user.newpwd  && confirm("Are you sure ? Do you want to save the details of "+this.user.fname+' '+this.user.lname)===true) {
      if (btnName == 'Save' && this.btnName === 'Save') {
        this.dataService.saveUser(JSON.stringify(this.user)).subscribe(response=>{
          console.log(response);
          if(JSON.parse(JSON.stringify(response)).response.message==="User Created Successfully." && JSON.parse(JSON.stringify(response)).response.statuscode === 200){

            this.succMsg= this.user.fname+" "+this.user.lname+" is saved";
            this.users=[];
            this.getUsers();
            this.modalService.close("exampleModal")
          }
          else{
           alert(JSON.parse(JSON.stringify(response)).response.message);
          }
        });
        this.modalService.close("exampleModal")
        return true;
      }
      else {
        this.dataService.updateUser(JSON.stringify(this.user)).subscribe(response=>{
          if(JSON.parse(JSON.stringify(response)).response.message==="User Details Updated Successfully." && JSON.parse(JSON.stringify(response)).response.statuscode === 200){
            alert("updated")
            this.succMsg= this.user.fname+" "+this.user.lname+" is saved";
            this.users=[];
            this.getUsers();
            this.modalService.close("exampleModal")
          }
          else{
           alert(JSON.parse(JSON.stringify(response)).response.message);
          }
        });
        this.modalService.close("exampleModal")
        return true;
      }


    }
    else {
      return false;
    }
  }

  getUsers(){
    this.dataService.getUsers().subscribe(element=>{
      
      this.users= element.valueOf();
      
       this.users= this.users['response'];
     
      console.log(this.users);
      this.itemsRecords = this.users.length;
      console.log(typeof(this.users))
     // console.log(JSON.parse(JSON.stringify(element))['response']);
    });
  }

}
