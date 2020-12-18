import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class DataService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  constructor(private http: HttpClient) { }
  params: any = {};

  //Tags
  getTags() {
    this.params={
      "id":"all",
      "token":JSON.parse(sessionStorage.currentUser)[0].token
    }   
    console.log(JSON.parse(sessionStorage.currentUser)[0].token)        
    return this.http.post(environment.apiUrl+'fetchTag',JSON.stringify(this.params), this.httpOptions)
  }
  getTag(id: number) {
    console.log("header");
    console.log(this.httpOptions);
    this.params={
      "id":id,
      "token":JSON.parse(sessionStorage.currentUser)[0].token
    }  
    console.log(typeof(this.params))
    return this.http.post(environment.apiUrl+'fetchTag',JSON.stringify(this.params), this.httpOptions)
  }
  saveTag(params: any) {
    console.log("header");
    console.log(this.httpOptions);
    this.params=JSON.parse(params);
   
    this.params.token=JSON.parse(sessionStorage.currentUser)[0].token
  
    return this.http.post(environment.apiUrl+'createTag', JSON.stringify(this.params), this.httpOptions)
  }
  updateTag(params: any) {
    console.log("header");
    console.log(this.httpOptions);
    this.params=JSON.parse(params);
   
    this.params.token=JSON.parse(sessionStorage.currentUser)[0].token
    return this.http.post(environment.apiUrl + 'editTag', JSON.stringify(this.params), this.httpOptions)
  }
  deleteTag(id: number) {
    console.log("header");
    console.log(this.httpOptions);
    this.params={
      "id":id,
      "token":JSON.parse(sessionStorage.currentUser)[0].token
    }
    console.log(this.params);
    return this.http.post(environment.apiUrl+'delTag', JSON.stringify(this.params), this.httpOptions)
  }

  //Categories
  getCategories() {
    console.log("header");
    console.log(this.httpOptions);
    this.params={
      "id":"all",
      "token":JSON.parse(sessionStorage.currentUser)[0].token
    }
    console.log(this.params);
    console.log(JSON.parse(sessionStorage.currentUser)[0].token)
    return this.http.post(environment.apiUrl+'/fetchCat',JSON.stringify(this.params),this.httpOptions)
  }
  getCategory(id: number) {
    this.httpOptions.headers.append('token', 'palmdale_api_key');
    console.log("header");
    console.log(this.httpOptions);
    console.log(this.httpOptions.headers.getAll('token'))
    return this.http.get(environment.apiUrl, this.httpOptions)
  }
  saveCategory(params: any) {
    console.log("header");
    console.log(this.httpOptions);
    this.httpOptions.headers.append('token', 'palmdale_api_key');
    console.log(this.httpOptions.headers.getAll('token'))
    console.log(JSON.stringify(this.httpOptions.headers));
    return this.http.post(environment.apiUrl, JSON.stringify(params), this.httpOptions)
  }
  updateCategory(params: any) {
    console.log("header");
    console.log(this.httpOptions);
    return this.http.post(environment.apiUrl, JSON.stringify(params), this.httpOptions)
  }
  deleteCategory(params: number) {
    console.log("header");
    console.log(this.httpOptions);
    return this.http.post(environment.apiUrl, JSON.stringify(params), this.httpOptions)
  }

  //users
  getUsers() {
   // console.log(JSON.parse(sessionStorage.currentUser)[0].token);
    this.params={
      "id":"all",
      "token":JSON.parse(sessionStorage.currentUser)[0].token
    }           
    return this.http.post(environment.apiUrl + 'getUsers',JSON.stringify(this.params),this.httpOptions)
  }
  getUser(id: number) {
    console.log("header");
    console.log(this.httpOptions);
    this.params={
      "id":id,
      "token":JSON.parse(sessionStorage.currentUser)[0].token
    }
    console.log(JSON.stringify(this.params))
    return this.http.post(environment.apiUrl+'getUsers',JSON.stringify(this.params), this.httpOptions)
  }
  saveUser(params: any) {
    console.log("header");
    console.log(this.httpOptions);
    // this.params={
    //   "token": JSON.parse(sessionStorage.currentUser)[0].token
    // }
    this.params=JSON.parse(params);
    this.params.token=JSON.parse(sessionStorage.currentUser)[0].token
    console.log()
    return this.http.post(environment.apiUrl+'createUser', JSON.stringify(this.params), this.httpOptions)
  }
  updateUser(params: any) {
    console.log("header");
    console.log(this.httpOptions);
    this.params=JSON.parse(params);
    this.params.token=JSON.parse(sessionStorage.currentUser)[0].token
    return this.http.post(environment.apiUrl+'editUser', JSON.stringify(this.params), this.httpOptions)
  }

  deleteUser(id: number) {
    console.log("header");
    console.log(this.httpOptions);
    this.params={
      "id":id,
    }
    this.params.token=JSON.parse(sessionStorage.currentUser)[0].token
    return this.http.post(environment.apiUrl+'delUser', JSON.stringify(this.params), this.httpOptions)
  }

  //Items
  getItems() {
    console.log("header");
    console.log(this.httpOptions);
    return this.http.get(environment.apiUrl, this.httpOptions)
  }
  getItem(id: number) {
    console.log("header");
    console.log(this.httpOptions);
    return this.http.get(environment.apiUrl, this.httpOptions)
  }
  saveItem(params: any) {
    console.log("header");
    console.log(this.httpOptions);
    return this.http.post(environment.apiUrl, JSON.stringify(params), this.httpOptions)
  }
  updateItem(params: any) {
    console.log("header");
    console.log(this.httpOptions);
    return this.http.post(environment.apiUrl, JSON.stringify(params), this.httpOptions)
  }
  deleteItem(params: number) {
    console.log("header");
    console.log(this.httpOptions);
    return this.http.post(environment.apiUrl, JSON.stringify(params), this.httpOptions)
  }

  //Blogs
  getBlogs() {
    console.log("header");
    console.log(this.httpOptions);
    return this.http.get(environment.apiUrl, this.httpOptions)
  }

  getBlog(id: number) {
    console.log("header");
    console.log(this.httpOptions);
    return this.http.get(environment.apiUrl, this.httpOptions)
  }

  saveBlog(params: any) {
    console.log("header");
    console.log(this.httpOptions);
    return this.http.post(environment.apiUrl, JSON.stringify(params), this.httpOptions)
  }

  updateBlog(params: any) {
    console.log("header");
    console.log(this.httpOptions);
    return this.http.post(environment.apiUrl, JSON.stringify(params), this.httpOptions)
  }
  onDeleteBlog(params: number) {
    console.log("header");
    console.log(this.httpOptions);
    return this.http.post(environment.apiUrl, JSON.stringify(params), this.httpOptions)
  }

 

  getMessages() {
    this.params={
      "id":"all",
      "token":JSON.parse(sessionStorage.currentUser)[0].token
    } 
    console.log(JSON.stringify(this.params))
    return this.http.post(environment.apiUrl+'getContacts',JSON.stringify(this.params), this.httpOptions)
  }

  getMessage(id: number) {
    return this.http.get(environment.apiUrl, this.httpOptions)
  }

  ////#For Wesite Purpose

   //contact message from contact page
   sendMessage(params: any) {
    return this.http.post(environment.apiUrl+'contactus',JSON.parse(params), this.httpOptions)
  }

  //To get details of blog from db
  getBlogsWb(){

    return this.http.get(environment.apiUrl+'getBlogs', this.httpOptions)
  }
  getCategoriesWb(){
    return this.http.get(environment.apiUrl+'fetchCat', this.httpOptions)
  }
  

}
