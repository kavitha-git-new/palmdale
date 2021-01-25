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

  createThemeLink(themeCss:string){
    var linkTag = document.createElement ("link");
		linkTag.rel = "stylesheet";
    linkTag.href = "assets/css/"+themeCss;
    if(themeCss=="main.min.css"){
      linkTag.id="theme";
    }
    else{
      linkTag.id="theme2";
    }
    
    console.log("Link");
    console.log(linkTag);
		var head = document.getElementsByTagName ("head")[0];
    head.appendChild (linkTag);
    console.log("Add main.css link for website theme");
  }

  removeLink(){
    const link = document.getElementById("theme")?.remove();
    console.log("Removed the link for theme css:main.css")
  }
  removeThemeLink(themeId:string){
    const link = document.getElementById(themeId)?.remove();
    console.log("Removed the link for theme css");
  }
  addStyleSheet() {
    var headID = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.id = 'widget_styles';
    headID.appendChild(link);
  
    link.href = 'assets/css/main.min.css';
  }
  
}
