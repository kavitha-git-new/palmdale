import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/components/services/data.service';
import { ModalService } from 'src/app/components/_modal';
import { checkToken, isEmpty, randomNumber } from "../../../models/data-modal";
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviews:any=[];
  review:any={};
  itemsRecords: number = 0;
  page: number = 1;
  btnName: string = "Save";
  errMsg: string = "";
  succMsg:string="";
  title: string = "";
  titleDescription: string = "";
  searchText:string="";
  disName:boolean=false;
  constructor(private dataService:DataService, private router:Router, private modalService:ModalService) { }

  ngOnInit(): void {
    this.reviews = Array(150).fill(0).map((x, i) => ({ id: (i + 1), created_on: new Date(), name: `Item ${i + 1}`, comment: `Item ${i + 1}`, ratings: randomNumber(1,5)}));
    this.itemsRecords=this.reviews.length;
    //this.getReviews();
  }

  onEdit(id: number, name:string, comment:string,dt:Date,ratings:number) {
    this.title = "Edit";
    this.titleDescription = "Edit details about the review to publish.";
    this.btnName = "Update"
    this.review.id = id;
    this.review.created_on=new Date(dt).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});;
    this.review.name=name;
    this.review.comment=comment;
    this.review.ratings=ratings;
    this.disName=true;

  //   this.dataService.getFAQ(id).subscribe(element => {
  //     this.review = element.valueOf();
  //     if(this.review['response']['message'] && checkToken(this.review['response']['message'].toString())===false){
  //       alert("Please login again.  Your session expired.");
  //       this.router.navigate(['/login']); 
      
  //     }
  //     else{
  //       this.review = JSON.parse(JSON.stringify(this.review['response'][0]));
  //       console.log(this.review.id);
  //       console.log(typeof (this.review));
  //     }
     
  //   }, error => {
  //     // alert(error)
  //      console.log( error);
  //      this.errMsg = "Please try again."
  //      return false;
  //  });
    this.modalService.open('exampleModal');
    console.log(id);
  }

  onDelete(id:number,name:string) {
   
    console.log(id)

    if (confirm("Are you sure? Do you want to delete the details about the Review of : " + name) === true) {
      this.dataService.deleteFAQ(id).subscribe(response=>{
        
        console.log(response);
        if(JSON.parse(JSON.stringify(response)).response.message && checkToken(JSON.parse(JSON.stringify(response)).response.message.toString())===false){

          alert("Please login again.  Your session expired.");
          this.router.navigate(['/login']); 
          return false;
         
        }
        else{
          if(JSON.parse(JSON.stringify(response)).response.message==="Review Deleted Successfully." && JSON.parse(JSON.stringify(response)).response.statuscode === 200){

            this.succMsg= name+" tag is deleted.";
            this.review=[];
            this.getReviews();
            this.modalService.close("exampleModal");
            return true;
          }
          else{
           alert("Please try again.");
           return false;
          }
        }
        
      },error => {
        // alert(error)
         console.log( error);
         alert("Please try again.");
         return false;
     });
      return true;

    }
    else {
      return false;
    }
  }

  onAdd(btName: string) {
    this.title = "Add";
    this.titleDescription = "Add details about the Review to save.";
    this.btnName = btName;
    this.review.id = 0;
    this.review.name = '';
    this.review.comment = '';
    this.review.created_on= new Date().toLocaleDateString('en-US',{day:'numeric',month:'long',year:'numeric'});
    this.errMsg = '';
    this.modalService.open('exampleModal');
    this.disName=false;
  }

  saveData(btName: string) {
    this.errMsg = "";
    if (this.review.name === '' || this.review.name.toString().length > 40) {
     // alert("Name");
      this.errMsg = "Please provide valid details."
      return false;
    }
    else {
      this.errMsg = "";
    }
    if(this.review.ratings==='' || isNaN(this.review.ratings)===true){
     // alert("ratings")
      this.errMsg = "Please provide valid details."
      return false;
    }
    if(this.review.ratings !== ''&& this.review.ratings.toString()>5){
     // alert("3");
      this.errMsg = "Please provide the valid ratings and provide the ratings out of 5."
      return false;
    }
    else{
      this.errMsg = "";
    }
    
    if (this.review.comment === '') {
     // alert("1");
      this.errMsg = "Please provide valid details."
      return false;
    }
    else if (this.review.comment !== '' && this.review.comment.toString().length>400) {
    //  alert("2");
      this.errMsg = "Please provide less than 400 characters in Comments."
      return false;
    }
    else {
      this.errMsg = "";
    }
    

    if (this.review.name !== '' && this.review.description !== "" && confirm("Are you sure ? Do you want to save the Review of  " + this.review.name) === true) {
      if (this.btnName === 'Save' || btName === 'Save') {
        this.dataService.saveReview(JSON.stringify(this.review)).subscribe(response => 
          {
         // alert(response);
          if (isEmpty(response)){
            this.errMsg = "Please try again."
            return false;
          } 
          
          else if(response.hasOwnProperty('response')===false ||JSON.parse(JSON.stringify(response)).response.message && checkToken(JSON.parse(JSON.stringify(response)).response.message.toString())===false){

            alert("Please login again.  Your session expired.");
            this.router.navigate(['/login']); 
            return false;
           
          }
          else{
            if (JSON.parse(JSON.stringify(response)).response.statuscode === 403 || JSON.parse(JSON.stringify(response)).response.message.name === 'The name has already been taken.') {
              this.errMsg = "Please try again."
              return false;
            }
            else{
              if(JSON.parse(JSON.stringify(response)).response.message=="Review Created Successfully."){
  
                this.succMsg= this.review.name+" tag is saved";
                this.review={};
                this.reviews=[];
                this.getReviews();
                this.modalService.close("exampleModal");
                return true;
              }
              else{
                this.errMsg="Please try again."
                return false;
              }
            }
          }
          
        },
        error => {
         // alert(error)
          console.log( error);
          this.errMsg = "Please try again."
          return false;
      }
        );
        
      }
      else {
        if (this.review.id !== '') { this.dataService.updateReview(JSON.stringify(this.review)).subscribe(response => {
          console.log(response);
          if (isEmpty(response)){
            this.errMsg = "Please try again."
            return false;
          } 
          
          if(response.hasOwnProperty('response')===false){
            this.errMsg = "Please try again."
            return false;
          }
          if( JSON.parse(JSON.stringify(response)).response.message && checkToken(JSON.parse(JSON.stringify(response)).response.message.toString())===false){

            alert("Please login again.  Your session expired.");
            this.router.navigate(['/login']); 
            return false;
           
          }
          else{
            if (JSON.parse(JSON.stringify(response)).response.statuscode === 403 || JSON.parse(JSON.stringify(response)).response.message.name === 'The name has already been taken.') {
              this.errMsg = "Please try again.";
              return false;
            }
            else{
              if(JSON.parse(JSON.stringify(response)).response.message=="Review Updated Successfully." || JSON.parse(JSON.stringify(response)).response.statuscode === 200 ){
  
                this.succMsg= this.review.name+"'s review is saved";
                this.reviews=[];
                this.getReviews();
                this.modalService.close("exampleModal");
                return true;
              }
              else{
                this.errMsg="Please try again.";
                return false;
              }
            }
          }
         
        }, error => {
          // alert(error)
           console.log( error);
           this.errMsg = "Please try again."
           return false;
       }) }
      }
     // alert("Data to save in Db.");


     
      return true;
    }
    else {
      return false;
    }



  }

  onClose(id: string) {
    this.modalService.close(id)
  }

  getReviews(){
    this.dataService.getReviews().subscribe(element => {
      let b = element.valueOf()
      this.reviews = element.valueOf()
      if (this.reviews['response']['message'] && checkToken(this.reviews['response']['message'].toString()) === false) {
        alert("Please login again. Your session has expired.");
        this.router.navigate(['/login']);

      }
      else {
        if (this.reviews['response']['data']) {
          this.reviews = this.reviews['response']['data'].valueOf();
          console.log('this.blogs')
          console.log(this.reviews)


          console.log(this.reviews[0]);
          console.log(typeof (this.reviews))
          console.log(this.reviews[0].category)
        }
        this.itemsRecords = this.reviews.length;
      }

    }, error => {
      console.log(error);
      alert("Please try again.");
      return false;
    });
  }

}
