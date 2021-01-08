import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user:any={};
  constructor(private router:Router,private dataService:DataService){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(sessionStorage.getItem('currentUser'))
      console.log(sessionStorage.currentUser);
       this.user= sessionStorage.getItem('currentUser');
      console.log(this.user)
      if (this.user!==null && this.user!=='' && (sessionStorage.currentUser)) {
       // console.log(JSON.parse(this.user)[0].id)
       // console.log(JSON.parse(sessionStorage.currentUser)[0].token);
        return true;
        /*  this.dataService.getUser(JSON.parse(this.user)[0].id).subscribe(response=>{
            this.user= response.valueOf();
            console.log('Have a nice day !');
            console.log(this.user['response'][0]);
            console.log(this.user['response']);
           // return true;
            if(this.user['response'][0].id===JSON.parse(this.user)[0].id)
          {  this.user= JSON.parse(JSON.stringify(this.user['response'][0]));
            console.log(this.user.id);
            console.log(typeof(this.user)); 
            return true;
          }
            else{
              this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
              return false;
            }
          })*/
        // logged in so return true
       
      }
      else{
         // not logged in so redirect to login page with the return url
         console.log(state.url);
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }

     // return false;
  }
  
}
