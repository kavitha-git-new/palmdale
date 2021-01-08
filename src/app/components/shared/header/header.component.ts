import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AddElementService } from '../../services/add-element.service';
import { LoginService } from '../../services/login.service';
import { ModalService } from '../../_modal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string = 'Home';

  user: any = {};
  userName: string = "";
  @Input() heading: string = ""
  constructor(private titleService: Title, private loginService: LoginService, private addElementService: AddElementService) {

    if (sessionStorage.currentUser) {
     if(JSON.parse(sessionStorage.currentUser)[0]){ this.user = JSON.parse(sessionStorage.currentUser)[0];}
     else { this.user = JSON.parse(sessionStorage.currentUser)}
      console.log(this.user.fname);
      this.userName = this.user.fname + ' ' + this.user.lname;

    }


  }

  ngOnInit(): void {
    this.title = this.titleService.getTitle();
    console.log(this.title)
    console.log(this.heading);

  }

  isTitle(ut: string | string[]): boolean {
    if (typeof ut == 'string') {
      console.log((this.heading == ut));
      return (this.heading == ut);
    }
    else {

      const match = ut.findIndex(e => e === this.heading);
      if (match !== -1) {
        if (this.heading === 'Login') {
          console.log(this.heading);
          this.addElementService.removeLink();
        }
        return true;
      }
      else {
        return false;
      }
    }

  }

  logOut() {
    this.loginService.onLogout();


  }
}
