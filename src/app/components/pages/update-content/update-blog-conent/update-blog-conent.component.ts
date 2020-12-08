import { Component, OnInit } from '@angular/core';
import { Blog, Recent_Post,Tag } from "../../../models/data-modal";


@Component({
  selector: 'app-update-blog-conent',
  templateUrl: './update-blog-conent.component.html',
  styleUrls: ['./update-blog-conent.component.css']
})
export class UpdateBlogConentComponent implements OnInit {
  blogs:Array<Blog> = [];
  recent_post:Array<Recent_Post>=[];
  tags:Array<Tag>=[];
  constructor() { 
    this.blogs=[
      {
        id:1,
        heading:'A BEGINNER’S INTRODUCTION TO THE LEGAL RULES OF MEDICAL CANNABIS',
        imageLink_wepp :'medical-marijuana-card-online-1.webp',
        imageLink_jpeg:'medical-marijuana-card-online-1.jpg',
        date: new Date('2020-11-23'),
        itemName:'Medical Marijuana'
  
      },
      {
        id:2,
        heading:'HOW TO USE YOUR MARIJUANA CARD FOR CHRONIC PAIN?',
        imageLink_wepp :'medical-marijuana-card-online-Palmdale-1.webp',
        imageLink_jpeg:'medical-marijuana-card-online-Palmdale-1.jpg',
        date: new Date('2020-11-24'),
        itemName:'Cannabis'
  
      },
      {
        id:3,
        heading:'6 TIPS TO ENJOY YOUR MARIJUANA EDIBLES SAFELY',
        imageLink_wepp :'6-Tips-to-Enjoy-Your-Marijuana-Edibles-Safely.webp',
        imageLink_jpeg:'6-Tips-to-Enjoy-Your-Marijuana-Edibles-Safely.jpg',
        date: new Date('2020-11-28'),
        itemName:'Medical Marijuana'
  
      },{
        id:4,
        heading:'A BEGINNER’S INTRODUCTION TO THE LEGAL RULES OF MEDICAL CANNABIS',
        imageLink_wepp :'medical-marijuana-card-online-1.webp',
        imageLink_jpeg:'medical-marijuana-card-online-1.jpg',
        date: new Date('2020-11-24'),
        itemName:'Medical Marijuana'
  
      },
       {
        id:5,
        heading:'HOW TO USE YOUR MARIJUANA CARD FOR CHRONIC PAIN?',
        imageLink_wepp :'medical-marijuana-card-online-Palmdale-1.webp',
        imageLink_jpeg:'medical-marijuana-card-online-Palmdale-1.jpg',
        date: new Date('2020-11-23'),
        itemName:'Cannabis'
  
      }, {
        id:6,
        heading:'6 TIPS TO ENJOY YOUR MARIJUANA EDIBLES SAFELY',
        imageLink_wepp :'6-Tips-to-Enjoy-Your-Marijuana-Edibles-Safely.webp',
        imageLink_jpeg:'6-Tips-to-Enjoy-Your-Marijuana-Edibles-Safely.jpg',
        date: new Date('2020-11-28'),
        itemName:'Medical Marijuana'
  
      }
    ]

    this.recent_post=[
      {
        id:1,
        post:'A Beginner’s Introduction to The Legal Rules of Medical Cannabis'
      },
      {
        id:2,
        post:'How to Use Your Marijuana Card for Chronic Pain?'
      },
      {
        id:3,
        post:'6 Tips to Enjoy Your Marijuana Edibles Safely'
      },
      {
        id:4,
        post:'Struggling With Asthma? Medical Cannabis Can Help'
      },
      {
        id:5,
        post:'The Pros And Cons of Smoking Medical Marijuana'
      }
    ]

    this.tags=[{
      id: 1,
      name:'Beauty',
      post_id:1
    },{
      id: 2,
      name:'bicycle',
      post_id:1
    },//health
    {
      id: 3,
      name:'health',
      post_id:3
    },
    {
      id: 4,
      name:'inspiration',
      post_id:2
    },
    {
      id: 5,
      name:'Music',
      post_id:2
    },
    {
      id:6,
      name:'auote',
      post_id:5
    },
    {
      id:7,
      name:'sunset',
      post_id:5
    },
    {
      id:8,
      name:'swim',
      post_id:5
    },
    {
      id:9,
      name:'time',
      post_id:5
    },//trendy
    {
      id:10,
      name:'weekend',
      post_id:5
    },
    {
      id:11,
      name:'women',
      post_id:5
    }
  ]

    
  }

  ngOnInit(): void {
  }

  getDate(date:Date){

    return date.toLocaleDateString('en-IN',{
      'day': '2-digit', 'month': 'short', 'year': 'numeric'
    });
  }
  onReadMore(id:number){

    return id;
  }

}
