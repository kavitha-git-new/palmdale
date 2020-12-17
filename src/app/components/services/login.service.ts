import { Injectable } from '@angular/core';
import  {environment} from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
params:any={};
  constructor(private http:HttpClient, private router:Router) { }

  onLogin(user:any){
    console.log("params");
    console.log(user);
    this.params= JSON.parse(user)
    return this.http.post('https://www.omcvapes.com/palmdale_api/login ',JSON.stringify({
   // "token":"dashboar_api_key",
   // "action":"checkuser",
    "email":this.params.email,
    "password":this.params.pwd

}),this.httpOptions);
    

  }

  onLogout(){
    sessionStorage.clear();
    console.log("LogOut");
    this.router.navigate(['/login']);
}
}
