import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { threadId } from 'worker_threads';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit ,OnDestroy{
   blogs:any=[];
   itemsRecords: number = 0;
   maxIdx:number=0;
  maxDate=new Date();
  minDate=new Date();
  recent_blogs:any=[];

  minIdx:number=0;
  constructor(private router:Router,private dataService:DataService) {
    
   }

  ngOnInit(): void {
    this.getBlogs();
    //alert("start");
    console.log(Math.max(...this.blogs))
   
  }

  ngOnDestroy():void{
       console.log("Have a nice day...")
       window.location.reload();  
  }

  ngAfterViewInit(): void{
    //window.location.reload();
  }
  
  getBlogs() {
    this.dataService.getBlogsWb().subscribe(element => {
    //  let b = element.valueOf()
      this.blogs = element.valueOf()

      if (this.blogs['response']['data']) {
        this.blogs = this.blogs['response']['data'].valueOf();
        console.log('this.blogs')
        console.log(this.blogs)
        console.log(this.blogs[0]);
        console.log(typeof (this.blogs))
        console.log(this.blogs[0].category);
        for(let j=1;j<=4;j++){
          let min = this.blogs[0]['date_of_creation'], max = this.blogs[0]['date_of_creation']
         
          for (let i = 1; i < this.blogs.length; i++) {
            let value = this.blogs[i]['date_of_creation'] , id=this.blogs[i]['id']
            min = (value < min) ? value : min
            max = (value > max) ? value : max
            }
          console.log(max)
          
          this.recent_blogs= this.blogs.filter((item:any, index:number )=> item.date_of_creation===max && Math.min(index))
          this.recent_blogs=this.recent_blogs.slice(0,3);
          console.log(this.recent_blogs);
        }
        console.log(this.blogs);
        console.log(this.recent_blogs);
        


        this.itemsRecords=this.blogs.length;
      }

   /*   for(let j=1; j<=3;j++){
        for(let i = 0; i < this.blogs.length; i++) {
         
           if(this.blogs[i].date_of_creation > this.blogs[this.maxIdx].date_of_creation) {
             this.maxIdx=i;
           };
          // if(this.blogs[i].date_of_creation < this.blogs[this.minIdx].date_of_creation) this.minIdx = i;
      }
   
       this.recent_blogs.push(this.blogs[this.maxIdx])
        this.blogs= this.blogs.filter((item:any, index:number )=> index===this.maxIdx)
      }*/
    
     
  

    
      /*let c:any={};
      
            for(this.i=0; this.i<this.blogs.length;this.i++)
            {
             // console.log(this.blogs[this.i])
           
      
          c=this.category.find(e => e.name===this.blogs[this.i].category
          );
          if(c===undefined){
            this.category.push({"name":this.blogs[this.i].category, "count":1})
          }
          else{
              this.category.findIndex(e=>{if(e.name===c.name){
                   e.count=e.count+1;
              }})
          }
            
            console.log(this.category);
                       
            
               
            }*/


    });
 

    

  }

  getArray(e:any){ 
    let temp = JSON.parse(e)
    console.log(e)  ;
    return temp;
   }

   getDate(date: Date) {
    let dt = new Date(date);
    return dt.getDate() + ' ' + dt.toLocaleString('en-IN', { month: 'short' }) + ' ' + dt.getFullYear();

  }

  onReadMore(id:number){
    this.router.navigateByUrl('singlepage/'+id).then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }
}
