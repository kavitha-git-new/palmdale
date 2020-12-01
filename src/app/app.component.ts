import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'palmdale';
  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private titleService: Title
) { }

ngOnInit() {
this.router
.events.pipe(
filter(event => event instanceof NavigationEnd),
map(() => {
let child = this.activatedRoute.firstChild;
while (child) {
if (child.firstChild) {
 child = child.firstChild;
} else if (child.snapshot.data && child.snapshot.data['title']) {
 return child.snapshot.data['title'];
} else {
 return null;
}
}
return null;
})).subscribe( (title: any) => {
  console.log('Title')
  console.log(title);
this.titleService.setTitle(title);
this.title=this.titleService.getTitle();

console.log(this.title);
});
}

}
