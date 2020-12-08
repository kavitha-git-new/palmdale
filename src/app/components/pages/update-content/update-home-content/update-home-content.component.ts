import { Component, OnInit } from '@angular/core';
import {FormGroup ,FormBuilder,Validator } from "@angular/forms";

@Component({
  selector: 'app-update-home-content',
  templateUrl: './update-home-content.component.html',
  styleUrls: ['./update-home-content.component.css']
})
export class UpdateHomeContentComponent implements OnInit {
  isShowDivIf = false;
  content:string='';
  
htmlString:string="<section id='section__three'><div class='container'> <p>The future is digital. There is no question. What you need is something to cut through the clutter and establish you as the voice to be heard. We provide you with sophisticated digital services and solutions to increase engagement, conversions, and revenue.</p></div></section>"
  submitted = false;
  loading = false
  formGp = new FormGroup({
  
  });

 
  formErrors: any = {};
  formMessages: any = {};
  currentUser: any = {};
  constructor() { }

  ngOnInit(): void {
  }

  onedit_about_us(){
    this.isShowDivIf = !this.isShowDivIf;
  }

}
