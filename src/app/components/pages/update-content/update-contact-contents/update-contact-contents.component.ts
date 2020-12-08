import { Component, OnInit } from '@angular/core';
import { Contact } from "../../../models/data-modal";

@Component({
  selector: 'app-update-contact-contents',
  templateUrl: './update-contact-contents.component.html',
  styleUrls: ['./update-contact-contents.component.css']
})
export class UpdateContactContentsComponent implements OnInit {

  contact :Array<Contact> = [];

  constructor() { }

  ngOnInit(): void {
    this.contact=[{
      location:{
        address:'830 E Palmdale Boulevard Suite #5001',
        city:'Palmdale,CA',
        county:'United States',
        pincode: 93550 
 
      },
      phone_number:{
        mobile:0, 
        phone_extn: 661,
        phone_number: 5350994}
        ,
        email:'contact@palmdalealternativemedcenter.com'
      }  
  ]
  }

  getPhoneNumber(mobile:number, phone_extn:number, phone_number:number){
 if(mobile===0|| mobile!==null){
   return '('+phone_extn+') '+phone_number;

 }
 else{
   return mobile
 }
  }

}
