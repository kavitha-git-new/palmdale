import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/pages/about/about.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SinglePageComponent } from './components/pages/single-page/single-page.component';
import { UpdateAboutContentComponent } from './components/pages/update-content/update-about-content/update-about-content.component';
import { UpdateBlogConentComponent } from './components/pages/update-content/update-blog-conent/update-blog-conent.component';
import { UpdateContactContentsComponent } from './components/pages/update-content/update-contact-contents/update-contact-contents.component';
import { UpdateHomeContentComponent } from './components/pages/update-content/update-home-content/update-home-content.component';
import { AdminComponent } from './components/pages/admin/admin.component';

//services
import { AuthGuard } from "../app/components/services/auth.guard";
import { UpdateCategoryComponent } from './components/pages/update-content/update-category/update-category.component';
import { UpdateTagComponent } from './components/pages/update-content/update-tag/update-tag.component';
const routes: Routes = [
  { path:'', pathMatch: 'full' ,redirectTo:'/home'},
  {path:'',pathMatch:'full', component:HomeComponent, data:{title:'Home'} },
  {path:'home', component:HomeComponent, data:{title:'Home' }},
  {path:'about',component:AboutComponent, data:{title:'About' }},
  {path:'blog',component:BlogComponent, data:{title:'Blog' }},
  {path:'contact',component:ContactComponent, data:{title:'Contact' }},
  {path:'single-page',component:SinglePageComponent, data:{title:'Single Page' }},
  {path:'login',component:LoginComponent, data:{title:'Login' }},

  //update-page-contents 
  {path:'cdashboard',component:AdminComponent, data:{title:'Dashboard' },canActivate:[AuthGuard]},
  {path:'ccategory',component:UpdateCategoryComponent, data:{title:'CCategory' },canActivate:[AuthGuard]},
  {path:'ctag',component:UpdateTagComponent, data:{title:'CTag' },canActivate:[AuthGuard]},
  {path:'chome',component:UpdateHomeContentComponent, data:{title:'CHome' },canActivate:[AuthGuard]},
  {path:'cabout',component:UpdateAboutContentComponent, data:{title:'CAbout' },canActivate:[AuthGuard]},
  {path:'cblog',component:UpdateBlogConentComponent, data:{title:'CBlog' },canActivate:[AuthGuard]},
  {path:'ccontact',component:UpdateContactContentsComponent, data:{title:'CContact' },canActivate:[AuthGuard]},
  {path:'**', component:HomeComponent, data:{title:'Home' }}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
