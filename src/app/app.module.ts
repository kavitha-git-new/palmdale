import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination'
//tinymce module
import { EditorModule } from "@tinymce/tinymce-angular";

import { ModalModule } from "./components/_modal";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { BannerComponent } from './components/shared/banner/banner.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AboutComponent } from './components/pages/about/about.component';
import { HomeComponent } from './components/pages/home/home.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { SinglePageComponent } from './components/pages/single-page/single-page.component';
import { UpdateHomeContentComponent } from './components/pages/update-content/update-home-content/update-home-content.component';
import { UpdateAboutContentComponent } from './components/pages/update-content/update-about-content/update-about-content.component';
import { UpdateBlogConentComponent } from './components/pages/update-content/update-blog-conent/update-blog-conent.component';
import { UpdateContactContentsComponent } from './components/pages/update-content/update-contact-contents/update-contact-contents.component';
import { EditHomeContentComponent } from './components/pages/update-content/edit-home-content/edit-home-content.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { UpdateCategoryComponent } from './components/pages/update-content/update-category/update-category.component';
import { SideBarComponent } from './components/shared/side-bar/side-bar.component';
import { LoginService } from './components/services/login.service';
import {AddElementService} from './components/services/add-element.service';
import { UpdateTagComponent } from './components/pages/update-content/update-tag/update-tag.component'
//contents update pages

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    BlogComponent,
    ContactComponent,
    SinglePageComponent,
    UpdateHomeContentComponent,
    UpdateAboutContentComponent,
    UpdateBlogConentComponent,
    UpdateContactContentsComponent,
    EditHomeContentComponent,
    LoginComponent,
    AdminComponent,
    UpdateCategoryComponent,
    SideBarComponent,
    UpdateTagComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    EditorModule,
    HttpClientModule,
    ModalModule,
    NgxPaginationModule
  ],
  providers: [AddElementService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
