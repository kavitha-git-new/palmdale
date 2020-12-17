import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/pages/about/about.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SinglePageComponent } from './components/pages/single-page/single-page.component';
import { UpdateAboutContentComponent } from './components/pages/update-content/update-about-content/update-about-content.component';
import { UpdateContactContentsComponent } from './components/pages/update-content/update-contact-contents/update-contact-contents.component';
import { UpdateHomeContentComponent } from './components/pages/update-content/update-home-content/update-home-content.component';
import { AdminComponent } from './components/pages/admin/admin.component';

//services
import { AuthGuard } from "../app/components/services/auth.guard";
import { UpdateCategoryComponent } from './components/pages/update-content/update-category/update-category.component';
import { UpdateTagComponent } from './components/pages/update-content/update-tag/update-tag.component';
import { UserComponent } from './components/pages/update-content/user/user.component';
import { ItemComponent } from './components/pages/update-content/item/item.component';
import { BlogComponent as CBlog } from './components/pages/update-content/blog/blog.component';
import { MessageComponent } from './components/pages/update-content/message/message.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, data: { title: 'Home' } },
  { path: 'home', component: HomeComponent, data: { title: 'Home' } },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'about', component: AboutComponent, data: { title: 'About' } },
  { path: 'blog', component: BlogComponent, data: { title: 'Blog' } },
  { path: 'contact', component: ContactComponent, data: { title: 'Contact' } },
  { path: 'single-page', component: SinglePageComponent, data: { title: 'Blog Details' } },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },

  // { path: '', pathMatch: 'full', component: HomeComponent, data: { title: 'Home' } },
  // { path: 'home', component: HomeComponent, data: { title: 'Home' } },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'about', loadChildren: ()=> import("./components/pages/about/about.component").then(m => m.AboutComponent), data: { title: 'About' } },
  // { path: 'blog', loadChildren: ()=> import("./components/pages/blog/blog.component").then(m => m.BlogComponent), data: { title: 'Blog' } },
  // { path: 'contact', component: ContactComponent, data: { title: 'Contact' } },
  // { path: 'single-page', component: SinglePageComponent, data: { title: 'Blog Details' } },
  // { path: 'login', component: LoginComponent, data: { title: 'Login' } },

  //update-page-contents 
  { path: 'cdashboard', component: AdminComponent, data: { title: 'Dashboard' }, canActivate: [AuthGuard] },
  { path: 'cuser', component: UserComponent, data: { title: 'CUser' }, canActivate: [AuthGuard] },
  { path: 'ccategory', component: UpdateCategoryComponent, data: { title: 'CCategory' }, canActivate: [AuthGuard] },
  { path: 'ctag', component: UpdateTagComponent, data: { title: 'CTag' }, canActivate: [AuthGuard] },
  { path: 'citem', component: ItemComponent, data: { title: 'CItem' }, canActivate: [AuthGuard] },
  { path: 'cblog', component: CBlog, data: { title: 'CBlog' }, canActivate: [AuthGuard] },

  { path: 'chome', component: UpdateHomeContentComponent, data: { title: 'CHome' }, canActivate: [AuthGuard] },
  { path: 'cabout', component: UpdateAboutContentComponent, data: { title: 'CAbout' }, canActivate: [AuthGuard] },
  { path: 'ccontact', component: UpdateContactContentsComponent, data: { title: 'CContact' }, canActivate: [AuthGuard] },
  { path: 'cmessage', component: MessageComponent, data: { title: 'CMessage' }, canActivate: [AuthGuard]},
  { path: '**', component: HomeComponent, data: { title: 'Home' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
