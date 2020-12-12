import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    console.log("header");
    console.log(this.httpOptions);
    return this.http.get(environment.apiUrl, this.httpOptions)
  }
  getTag(id: number) {
    console.log("header");
    console.log(this.httpOptions);
    return this.http.get(environment.apiUrl, this.httpOptions)
  }
  saveTag(params: any) {
    console.log("header");
    console.log(this.httpOptions);
    return this.http.post(environment.apiUrl, JSON.stringify(params), this.httpOptions)
  }
  updateTag(params: any) {
    console.log("header");
    console.log(this.httpOptions);
    return this.http.post(environment.apiUrl, JSON.stringify(params), this.httpOptions)
  }

  //Categories
  getCategories() {
    console.log("header");
    console.log(this.httpOptions);
    return this.http.get(environment.apiUrl, this.httpOptions)
  }
  getCategory(id: number) {
    console.log("header");
    console.log(this.httpOptions);
    return this.http.get(environment.apiUrl, this.httpOptions)
  }
  saveCategory(params: any) {
    console.log("header");
    console.log(this.httpOptions);
    return this.http.post(environment.apiUrl, JSON.stringify(params), this.httpOptions)
  }
  updateCategory(params: any) {
    console.log("header");
    console.log(this.httpOptions);
    return this.http.post(environment.apiUrl, JSON.stringify(params), this.httpOptions)
  }

  //users
  getUsers() {
    console.log("header");
    console.log(this.httpOptions);
    return this.http.get(environment.apiUrl, this.httpOptions)
  }
  getUser(id: number) {
    console.log("header");
    console.log(this.httpOptions);
    return this.http.get(environment.apiUrl, this.httpOptions)
  }
  saveUser(params: any) {
    console.log("header");
    console.log(this.httpOptions);
    return this.http.post(environment.apiUrl, JSON.stringify(params), this.httpOptions)
  }
  updateUser(params: any) {
    console.log("header");
    console.log(this.httpOptions);
    return this.http.post(environment.apiUrl, JSON.stringify(params), this.httpOptions)
  }

  //contact message from contact page
  sendMessage(params:any){
    return this.http.get(environment.apiUrl,this.httpOptions)
  }
}
