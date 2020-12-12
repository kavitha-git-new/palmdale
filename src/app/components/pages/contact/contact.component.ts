import { Component, OnInit,OnDestroy } from '@angular/core';
import { Contact_Message, isEmailValid,allLetter } from "../../models/data-modal";
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit,OnDestroy  {
  
  name:string='';
  email:string='';
  phone:string="";
  message:string='';
  errMsg="";
  cm:Contact_Message= new Contact_Message();
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    
  }

  ngOnDestroy():void{
    
    window.location.reload();
  }

  onSubmit(cm:Contact_Message){
     
    console.log(JSON.stringify(cm));
    if(cm.name==="" || allLetter(cm.name)===false || cm.name===null){
    this.errMsg="Please provide valid details";
      return false
    }
    else{
      this.errMsg="";
    }
    if(cm.email==="" || isEmailValid(cm.email)===false){
      this.errMsg="Please provide valid details";
        return false
      }
      else{
        this.errMsg="";
      }
      if(cm.phone ===undefined || isNaN(cm.phone)===false || cm.phone.toString().length!==10){
        this.errMsg="Please provide valid details";
          return false
        }
        else{
          this.errMsg="";
        }
        if(cm.message ==='' || cm.message===null){
          this.errMsg="Please provide valid details";
            return false
          }
          else{
            this.errMsg="";
          }

          if(cm.name!=='' && cm.message!=='' && isNaN(cm.phone)===true && cm.phone.toString().length===10 && cm.email!=='') {
                  this.dataService.sendMessage(JSON.stringify(cm)).subscribe(
                    response=>{
                      console.log(response);
                    }
                  )
            return true;

          }
          else{
            return false;
          }

  }
}
