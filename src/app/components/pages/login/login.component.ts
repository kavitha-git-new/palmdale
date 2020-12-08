import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isEmailValid } from "../../models/data-modal";
import { LoginService } from "../../services/login.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = { email:'',
pwd:''};
  errMsg: string = "";
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginService.onLogout();
  }

  login(user: any) {

    if (user.email !== '' || isEmailValid(user.email) === false || user.pwd !== '') {
      this.errMsg = "Please provide valid credentials."
      return false;
    }
    else {
      this.loginService.onLogin(JSON.stringify(user))
        .subscribe(user => {
          // alert(Object.keys(user).length);
          if (Object.keys(user).length !== 0) {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            this.router.navigate(['/cdashboard']);
            this.errMsg = "";
            return true;
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
        sessionStorage.setItem('currentUser', JSON.stringify({id:1, role:'Admin',name:'Kavitha', email:'kavitha.jdm@gmail.com'}));
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


