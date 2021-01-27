import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/components/services/data.service';
import { ModalService } from 'src/app/components/_modal';
import { checkToken,isEmpty} from '../../../models/data-modal'
@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {

  packages:any=[];
  package:any={};
  itemsRecords: number = 0;
  page: number = 1;
  btnName: string = "Save";
  errMsg: string = "";
  succMsg:string="";
  title: string = "";
  titleDescription: string = "";
  searchText:string="";

  constructor(private dataService:DataService, private router:Router, private modalService:ModalService) { 
    this.packages = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`, description: `Item ${i + 1}`, amount :Math.floor((Math.random() * 80) + 50)}));
    this.itemsRecords=this.packages.length;

  }

  ngOnInit(): void {
   this.getPackages();
  }
  
  onEdit(id: number, name:string, description:string,amount:number) {
    this.title = "Edit";
    this.titleDescription = "Edit details about the packages to update.";
    this.btnName = "Update"
    this.package.id = id;
    this.package.name=name;
    this.package.amount=amount;
    this.package.description=description;
  //   this.dataService.getPackage(id).subscribe(element => {
  //     this.package = element.valueOf();
  //     if(this.package['response']['message'] && checkToken(this.package['response']['message'].toString())===false){
  //       alert("Please login again.  Your session expired.");
  //       this.router.navigate(['/login']); 
      
  //     }
  //     else{
  //       this.package = JSON.parse(JSON.stringify(this.package['response'][0]));
  //       console.log(this.package.id);
  //       console.log(typeof (this.package));
  //     }
     
  //   }, error => {
     
  //      console.log( error);
  //      this.errMsg = "Please try again."
  //      return false;
  //  });
    this.modalService.open('exampleModal');
    console.log(id);
  }

  onDelete(id:number,name:string) {
   
    console.log(id)

    if (confirm("Are you sure? Do you want to delete the details about the FAQ : " + name) === true) {
      this.dataService.deletePackage(id).subscribe(response=>{
        
        console.log(response);
        if(JSON.parse(JSON.stringify(response)).response.message && checkToken(JSON.parse(JSON.stringify(response)).response.message.toString())===false){

          alert("Please login again.  Your session expired.");
          this.router.navigate(['/login']); 
          return false;
         
        }
        else{
          if(JSON.parse(JSON.stringify(response)).response.message==="FAQ Deleted Successfully." && JSON.parse(JSON.stringify(response)).response.statuscode === 200){

            this.succMsg= name+" tag is deleted.";
            this.package=[];
            this.getPackages();
            this.modalService.close("exampleModal");
            return true;
          }
          else{
           alert("Please try again.");
           return false;
          }
        }
        
      },error => {
        // alert(error)
         console.log( error);
         alert("Please try again.");
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
    this.titleDescription = "Add details about the FAQ to save.";
    this.btnName = btName;
    this.package.id = 0;
    this.package.name = '';
    this.package.description = '';
    this.errMsg = '';
    this.modalService.open('exampleModal');
  }

  saveData(btName: string) {
    this.errMsg = "";
    if (this.package.name === '' || this.package.name.length > 35) {
      this.errMsg = "Please provide valid details."
      return false;
    }
    else {
      this.errMsg = "";
    }
    if (this.package.description === '') {
      this.errMsg = "Please provide valid details."
      return false;
    }
    else if (this.package.description !== '' && this.package.description.toString().length>460) {
      this.errMsg = "Please provide less than 460 characters in Description."
      return false;
    }
    else {
      this.errMsg = "";
    }
    

    if (this.package.name !== '' && this.package.description !== "" && confirm("Are you sure ? Do you want to save the details of " + this.package.name) === true) {
      if (this.btnName === 'Save' || btName === 'Save') {
        this.dataService.saveFAQ(JSON.stringify(this.package)).subscribe(response => 
          {
          alert(response);
          if (isEmpty(response)){
            this.errMsg = "Please try again."
            return false;
          } 
          
          else if(response.hasOwnProperty('response')===false ||JSON.parse(JSON.stringify(response)).response.message && checkToken(JSON.parse(JSON.stringify(response)).response.message.toString())===false){

            alert("Please login again.  Your session expired.");
            this.router.navigate(['/login']); 
            return false;
           
          }
          else{
            if (JSON.parse(JSON.stringify(response)).response.statuscode === 403 || JSON.parse(JSON.stringify(response)).response.message.name === 'The name has already been taken.') {
              this.errMsg = "Please try again."
              return false;
            }
            else{
              if(JSON.parse(JSON.stringify(response)).response.message=="FAQ Created Successfully."){
  
                this.succMsg= this.package.name+" tag is saved";
                this.package={};
                this.package=[];
                this.getPackages();
                this.modalService.close("exampleModal");
                return true;
              }
              else{
                this.errMsg="Please try again."
                return false;
              }
            }
          }
          
        },
        error => {
         // alert(error)
          console.log( error);
          this.errMsg = "Please try again."
          return false;
      }
        );
        
      }
      else {
        if (this.package.id !== '') { this.dataService.updateFAQ(JSON.stringify(this.package)).subscribe(response => {
          console.log(response);
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
            if (JSON.parse(JSON.stringify(response)).response.statuscode === 403 || JSON.parse(JSON.stringify(response)).response.message.name === 'The name has already been taken.') {
              this.errMsg = "Please try again.";
              return false;
            }
            else{
              if(JSON.parse(JSON.stringify(response)).response.message=="Tag Updated Successfully." || JSON.parse(JSON.stringify(response)).response.statuscode === 200 ){
  
                this.succMsg= this.package.name+" FAQ is saved";
                this.packages=[];
                this.getPackages();
                this.modalService.close("exampleModal");
                return true;
              }
              else{
                this.errMsg="Please try again.";
                return false;
              }
            }
          }
         
        }, error => {
          // alert(error)
           console.log( error);
           this.errMsg = "Please try again."
           return false;
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
  getPackages(){

  }


}
