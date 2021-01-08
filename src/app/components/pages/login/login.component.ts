import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isEmailValid } from "../../models/data-modal";
import { LoginService } from "../../services/login.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  user: any = { email:'',
pwd:''};
  errMsg: string = "";
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginService.onLogout();
  }
  ngOnDestroy():void{
    window.location.reload();
  }

  login(user: any) {

    if (user.email === '' || isEmailValid(user.email) === false || user.pwd === '') {
      this.errMsg = "Please provide valid credentials."
      return false;
    }
    else {
      this.loginService.onLogin(JSON.stringify(user))
        .subscribe(user => {
          // alert(Object.keys(user).length);
          // console.log(JSON.stringify(user))
          // console.log(JSON.parse(JSON.stringify(user)).response.statuscode);
          console.log(user)
          if (Object.keys(user).length !== 0) {
            if(JSON.parse(JSON.stringify(user)).response.statuscode===401){
              this.errMsg = "Please provide a vaild credentails";
            return false;
            }
            else if(JSON.parse(JSON.stringify(user)).response.statuscode===403){
              this.errMsg = "User account deactivated";
              return false;
            }
            else{
              sessionStorage.setItem('currentUser', JSON.stringify(JSON.parse(JSON.stringify(user)).response));
              this.router.navigate(['/cdashboard']);
              this.errMsg = "";
              return true;
            }
          
          }
          else {
            this.errMsg = "Please provide a vaild credentails";
            return false;
          }

        })

    }
    return true;
  }

  login1(user: any) {
   
   console.log(user.email)
   console.log(user.pwd)
    if (user.email === '' || isEmailValid(user.email) === false || user.pwd === '') {
      console.log("user");
      this.errMsg = "Please provide valid credentials."
      return false;
    }
    else {
      if (user.email === 'kavitha.jdm@gmail.com' && user.pwd == 'JDM@1234') {
        sessionStorage.setItem('currentUser', JSON.stringify({id:1, role:'Admin',fname:'Kavitha', lname:'UdayaKumar', email:'kavitha.jdm@gmail.com'}));
        console.log(sessionStorage.currentUser);
        this.router.navigate(['/cdashboard']);
        this.errMsg = "";
        return true;
      }
      else {
        this.errMsg = "Please provide valid credentials."
        return false;
      }
    }
  }
  }


