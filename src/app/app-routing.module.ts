import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/pages/about/about.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SinglePageComponent } from './components/pages/single-page/single-page.component';

const routes: Routes = [
  { path:'', pathMatch: 'full' ,redirectTo:'/home'},
  {path:'',pathMatch:'full', component:HomeComponent, data:{title:'Home'} },
  {path:'home', component:HomeComponent, data:{title:'Home' }},
  {path:'about',component:AboutComponent, data:{title:'About' }},
  {path:'blog',component:BlogComponent, data:{title:'Blog' }},
  {path:'contact',component:ContactComponent, data:{title:'Contact' }},
  //single-page
  {path:'single-page',component:SinglePageComponent, data:{title:'Single Page' }},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
