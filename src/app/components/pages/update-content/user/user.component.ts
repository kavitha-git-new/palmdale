import { Component, OnInit } from '@angular/core';
import { Router,RouterStateSnapshot } from '@angular/router';
import { DataService } from 'src/app/components/services/data.service';
import { ModalService } from 'src/app/components/_modal';
import { allLetter, isEmailValid } from "../../../models/data-modal";
import { checkToken,isEmpty } from "../../../models/data-modal";
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
  users:any =[];
  searchText:string="";
  constructor(private modalService: ModalService, private dataService: DataService, private router:Router) { 
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
      if (isEmpty(element)){
        this.errMsg = "Please try later."
       alert(this.errMsg);
       return false;
      }
      this.user= element.valueOf();
      if(this.user['response']['message'] && checkToken(this.user['response']['message'].toString())===false){
        alert("Please login again. Your session has expired.");
        this.router.navigate(['/login']); 
       
      }
      else{
        this.user= JSON.parse(JSON.stringify(this.user['response'][0]));
        console.log(this.user.id);
        console.log(typeof(this.user));
       
      }
      
     
      return true;   
    },
    error => {
      // alert(error)
       console.log( error);
       this.errMsg = "Please try again."
       return false;
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
        if(JSON.parse(JSON.stringify(response)).response.message && checkToken(JSON.parse(JSON.stringify(response)).response.message.toString())===false){

          alert("Please login again. Your session has expired.");
          this.router.navigate(['/login']); 
          return false;

         
        }
        else{
          if(JSON.parse(JSON.stringify(response)).response.message==="User Delete Successfully." && JSON.parse(JSON.stringify(response)).response.statuscode === 200){

            this.succMsg= this.user.fname+" "+this.user.lname+" details is deleted.";
            this.users=[];
            this.getUsers();
            this.modalService.close("exampleModal");
            return true;
          }
          else{
          // alert(JSON.parse(JSON.stringify(response)).response.message);
          alert("Please try again.")
           return false;
          }
        }
        
      }, error => {
        // alert(error)
         console.log( error);
         this.errMsg = "Please try again."
         return false;
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

    if (this.user.fname === '' || allLetter(this.user.fname) === false || this.user.fname.length > 45 || this.user.fname.length<3) {
      this.errMsg = "Please provide valid details."
      return false;
    }
    else {
      this.errMsg = ""
    }
    if (this.user.lname === '' || allLetter(this.user.lname) === false || this.user.lname.length > 45 || this.user.fname.length<3) {
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
   

    if (this.user.password === '' || this.user.newpwd === '') {
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
          if (isEmpty(response)){
            this.errMsg = "Please try again."
            return false;
          } 

          if(response.hasOwnProperty('response')===false || JSON.parse(JSON.stringify(response)).response.message && checkToken(JSON.parse(JSON.stringify(response)).response.message.toString())===false){

            alert("Please login again. Your session has expired.");
            this.router.navigate(['/login']); 
            return false;
           
          }
          else{
            if(JSON.parse(JSON.stringify(response)).response.message==="User Created Successfully." && JSON.parse(JSON.stringify(response)).response.statuscode === 200){

              this.succMsg= this.user.fname+" "+this.user.lname+" is saved";
              this.users=[];
              this.getUsers();
              this.modalService.close("exampleModal");
              return true;
            }
            else{
            // alert(JSON.parse(JSON.stringify(response)).response.message);
            //if(JSON.parse(JSON.stringify(response)).response.message.lname==="The lname must be at least 3 characters." || JSON.parse(JSON.stringify(response)).response.message.mobile)
            console.error(JSON.parse(JSON.stringify(response)).response.message);
           // alert(JSON.parse(JSON.stringify(response)).response.message)
             this.errMsg="Please provide the valid details."
             return false;
            }
          }
         
        }, error => {
          // alert(error)
           console.log( error);
           this.errMsg = "Please try again."
           return false;
       });
       
      }
      else {
        //for update
        this.dataService.updateUser(JSON.stringify(this.user)).subscribe(response=>{
          if (isEmpty(response)){
            this.errMsg = "Please try again."
            return false;
          } 

          if(response.hasOwnProperty('response')===false){
            this.errMsg = "Please try again."
            return false;
          }
          if( JSON.parse(JSON.stringify(response)).response.message && checkToken(JSON.parse(JSON.stringify(response)).response.message.toString())===false){

            alert("Please login again.  Your session expired.");
            this.router.navigate(['/login']); 
            return false;
           
          }
          else{
            if(JSON.parse(JSON.stringify(response)).response.message==="User Details Updated Successfully." && JSON.parse(JSON.stringify(response)).response.statuscode === 200){
             // alert("updated")
              this.succMsg= this.user.fname+" "+this.user.lname+" is saved";
              this.users=[];
              this.getUsers();
              this.modalService.close("exampleModal");
              return true;
            }
            else{
             alert(JSON.parse(JSON.stringify(response)).response.message);
             this.errMsg="Please try again"
             return false;
            }

          }
         
        }, error => {
          // alert(error)
           console.log( error);
           this.errMsg = "Please try again."
           return false;
       });
         return false;
      }


    }
    else {
      return false;
    }
    return;
  }

  getUsers(){
    this.dataService.getUsers().subscribe(element=>{
      
      this.users= element.valueOf();
      console.log(this.users['response']['message']);
      if(this.users['response']['message'] && checkToken(this.users['response']['message'].toString())===false){
        alert("Please login again. Your session has expired.");
        this.router.navigate(['/login']); 
       
      }
      else{
        this.users= this.users['response'];
     
        console.log(this.users);
        this.itemsRecords = this.users.length;
        console.log(typeof(this.users))

      }
       
     // console.log(JSON.parse(JSON.stringify(element))['response']);
    }, error => {
      // alert(error)
       console.log( error);
       this.errMsg = "Please try again."
       return false;
   });
  }

}
