import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AddElementService {

  constructor()  { }

  createLink(){
    var linkTag = document.createElement ("link");
		linkTag.rel = "stylesheet";
    linkTag.href = "assets/css/main.min.css";
    linkTag.id="theme";
    console.log("Link");
    console.log(linkTag);
		var head = document.getElementsByTagName ("body")[0];
    head.appendChild (linkTag);
    console.log("Add main.css link for website theme");
  }

  removeLink(){
    const link = document.getElementById("theme")?.remove();
    console.log("Removed the link for theme css:main.css")
  }
}
