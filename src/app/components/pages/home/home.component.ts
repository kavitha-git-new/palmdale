import { Component, OnInit,OnDestroy } from '@angular/core';
import { NgControlStatusGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { checkToken } from "../../models/data-modal";
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
  faqs:any=[];
  /*frequently asked questions array:*/
  /*faqs=[{
    id:'1',
    title:'How to Get a Medical Marijuana Card in Palmdale? ',
    description:'There’s scientific evidence that medical cannabis can help in treating a wide range of conditions. To buy medical cannabis legally from state-licensed dispensaries, you require a licensed medical doctor’s recommendation. We at <strong>Medical Cannabis Card Evaluations Palmdale</strong> allow patients to apply for medical marijuana evaluation Palmdale within minutes. Using our doctor signed MMJ card, you can visit any state-licensed dispensary, and buy marijuana products.'
  },
  {
    id:'2',
    title:'Why Do I Need to Apply For Medical Marijuana Renewal?  ',
    description:'In California, medical cannabis patients can possess and purchase marijuana for health benefits. The doctor-issued MMJ card is valid for 12 months, and if you want to continue medical cannabis treatment, you need to apply for MMJ renewal. The process is similar to that of applying for a new card. The doctor will analyze your condition and provide you renewed card, which is valid for another year.'
  },
  {
    id:'3',
    title:'What’s The Complete Process to Get an MMJ Recommendation Letter? ',
    description:'The process of getting a medical marijuana card is very simple, and it hardly takes 10 minutes. Just sign up for an account and fill all your medical details. After you click the submit button, a licensed doctor will contact you over a secure HIPAA-compliant platform. The doctor will examine your condition, check your medical history, and ask you a few questions. After you’re approved, you will receive your MMJ letter over the email instantly. Additionally, your official medical marijuana recommendation and hard-copy MMJ card will arrive via regular postal service.'
  },
  {
    id:'4',
    title:'Where Can I Buy Medical Marijuana Products? ',
    description:'In California, medical marijuana cardholders can buy cannabis products from state-licensed dispensaries. For medical users, there’s a wide range of options available in strains, oils, topicals, etc. It’s recommended to talk to a professional MMJ doctor Palmdale and get sound advice for what’s right for your condition.'
  },
  {
    id:'5',
    title:'What Are The Major Requirements To Get a Medical Cannabis Card in Palmdale? ',
    description:'To get medical marijuana evaluations Palmdale, you must be a resident of California. Moreover, you must be diagnosed by one of the state’s MMJ qualifying conditions. Your doctor will examine your condition carefully and may ask you to show medical history for verification purposes. After you’re approved, you will get your MMJ card.'
  },
  {
    id:'6',
    title:'In California, Adult-Use Marijuana is Legal. Do I Still Need to Apply For a Medical Marijuana Card in Palmdale?',
    description:'In California, marijuana is legal for both medical and recreational purposes. But, medical users enjoy many advantages over recreational users. These include—age relaxations, access to high-potency products & more dispensaries, and tax saving. Talk to our doctors to obtain a California medical marijuana card today.'
  }
]*/

  minIdx:number=0;
  constructor(private router:Router,private dataService:DataService) {
    
   }

  ngOnInit(): void {
    this.getBlogs();
    //alert("start");
    this.getFAQs();
    console.log(Math.max(...this.blogs))
   
  }

  ngOnDestroy():void{
       console.log("Have a nice day...")
      // window.location.reload();  
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
    //console.log(e)  ;
    return temp;
   }

   getDate(date: Date) {
    let dt = new Date(date);
    return dt.getDate() + ' ' + dt.toLocaleString('en-IN', { month: 'short' }) + ' ' + dt.getFullYear();

  }

  onReadMore(id:number){
    this.router.navigateByUrl('single-page/'+id).then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });

  // this.router.navigateByUrl('blog/'+id);
  }

  getFAQs(){
    this.dataService.getFAQs().subscribe(element=>{
      
      this.faqs= element.valueOf();
     
      console.log(this.faqs['response']['message']);
      if(this.faqs['response']['message']){
        console.error(this.faqs['response']['message']);
       // this.router.navigate(['/home']); 
       
      }
      else{
      
        if (this.faqs['response']['data']) {
          this.faqs = this.faqs['response']['data'].valueOf();
          console.log('this.faqs')
          console.log(this.faqs)


          console.log(this.faqs[0]);
          console.log(typeof (this.faqs))
          console.log(this.faqs[0].category)
        }
       // this.itemsRecords = this.faqs.length;

      }
       
     // console.log(JSON.parse(JSON.stringify(element))['response']);
    }, error => {
      // alert(error)
       console.error( error);
       console.log("Please try again.");
       return false;
   });
  }
}
