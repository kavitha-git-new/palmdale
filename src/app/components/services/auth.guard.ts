import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(sessionStorage.getItem('currentUser'))
      console.log(sessionStorage.currentUser);
      const user= sessionStorage.getItem('currentUser');
      console.log(user)
      if (user!==null && user!=='' && (sessionStorage.currentUser)) {
         
        // logged in so return true
        return true;
      }
      else{
         // not logged in so redirect to login page with the return url
         console.log(state.url);
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
  }
  
}
