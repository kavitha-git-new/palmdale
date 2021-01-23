import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule} from 'ngx-pagination'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
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

import { UpdateContactContentsComponent } from './components/pages/update-content/update-contact-contents/update-contact-contents.component';
import { EditHomeContentComponent } from './components/pages/update-content/edit-home-content/edit-home-content.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { UpdateCategoryComponent } from './components/pages/update-content/update-category/update-category.component';
import { SideBarComponent } from './components/shared/side-bar/side-bar.component';
import { UpdateTagComponent } from './components/pages/update-content/update-tag/update-tag.component'
import { BlogComponent as CBlog } from './components/pages/update-content/blog/blog.component';

//contents update pages

//services
import { LoginService } from './components/services/login.service';
import { AddElementService} from './components/services/add-element.service';
import { DataService} from './components/services/data.service';
import { UserComponent } from './components/pages/update-content/user/user.component';
import { ItemComponent } from './components/pages/update-content/item/item.component';
import { MessageComponent } from './components/pages/update-content/message/message.component';
import { RouterModule } from '@angular/router';
import { FilterPipe } from './components/pipes/filter.pipe';
import { FaqComponent } from './components/pages/update-content/faq/faq.component';
import { PackagesComponent } from './components/pages/update-content/packages/packages.component';
import { ReviewsComponent } from './components/pages/update-content/reviews/reviews.component';
import { ServiceWorkerModule, SwRegistrationOptions } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { registerLocaleData } from '@angular/common';

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
    
    UpdateContactContentsComponent,
    EditHomeContentComponent,
    LoginComponent,
    AdminComponent,
    UpdateCategoryComponent,
    SideBarComponent,
    UpdateTagComponent,
    UserComponent,
    ItemComponent,
    MessageComponent,
    CBlog,
    FilterPipe,
    FaqComponent,
    PackagesComponent,
    ReviewsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    EditorModule,
    HttpClientModule,
    ModalModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    RouterModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy:'registerImmediately' })
  ],
  providers: [AddElementService,LoginService,DataService],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
