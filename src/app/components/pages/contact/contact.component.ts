import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact_Message,Contact, isEmailValid, allLetter } from "../../models/data-modal";
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {

  succMsg: string = ""
  errMsg: string = "";
  contact :Array<Contact> = [];

  cm: Contact_Message = new Contact_Message();
  constructor(private dataService: DataService) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

   // window.location.reload();
  }

  onSubmit() {

    console.log(JSON.stringify(this.cm));
    
    if (this.cm.name === "" || allLetter(this.cm.name) === false || this.cm.name === null) {
 
      this.errMsg = "Please provide valid details";
      return false
    }
    else {
      this.errMsg = "";
    }
    if (this.cm.email === "" || isEmailValid(this.cm.email) === false) {
     
      this.errMsg = "Please provide valid details";
      return false
    }
    else {
      this.errMsg = "";
    }
    if (this.cm.mobile === undefined || this.cm.mobile.toString().length !== 10 || this.cm.mobile.toString().length < 10) {

      this.errMsg = "Please provide valid details";
      return false
    }
    else {
      this.errMsg = "";
    }
    if (this.cm.message === '' || this.cm.message === null) {
      this.errMsg = "Please provide valid details";
      return false
    }
    else {
      this.errMsg = "";
    }

    if (this.cm.name !== '' && this.cm.message !== '' && (this.cm.mobile !== null && this.cm.mobile !== 0) && this.cm.mobile.toString().length === 10 && this.cm.email !== '') {
     // alert("Request to send is going to start");
      this.errMsg = "";
      this.dataService.sendMessage(JSON.stringify(this.cm)).subscribe(
        (response:any) => {
          //alert("response");
          console.log(response);
          if (JSON.parse(JSON.stringify(response)).response.statuscode === 200 && JSON.parse(JSON.stringify(response)).response.message === 'Request submitted Successfully.') {
            this.succMsg = "Your message is successfully sent."
            this.cm.name = "";
            this.cm.email = ""
            this.cm.message = "";
            this.cm.mobile = 0;
          }
          else{
            this.succMsg="";
            this.errMsg="Please try again."
          }


        },(error:any) => {
          console.error(error);
          return false;
        })
      return true;

    }
    else {
      return false;
    }

  }
}
