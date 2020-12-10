import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
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

  @Input() heading: string = ""
  constructor(private titleService: Title, private loginService:LoginService) {
    if (sessionStorage.currentUser) {

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
        return true;
      }
      else {
        return false;
      }
    }

  }

  logOut(){
    this.loginService.onLogout();
    

  }
}
