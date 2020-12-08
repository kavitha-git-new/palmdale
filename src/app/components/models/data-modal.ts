export class Blog {
    heading: string = "";
    imageLink_wepp: string = "";
    imageLink_jpeg: string = "";
    date: Date = new Date();
    id: number = 0;
    itemName: string = "";
}

export class Recent_Post {
    id: number = 0;
    post: string = "";
}

export class Contact {
    location: any = {
        address: '',
        city: '',
        country: '',
        pincode: 0
    };
    phone_number: any = {
        mobile: 0,
        phone_extn: 0,
        phone_number: 0
    };
    email: string = "";
}

export class Tag{
    id:number=0;
    name:string='';
    post_id:number=0;
    }

    export function isEmailValid(email:string){
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
        {
          return (true)
        }
          alert("You have entered an invalid email address!")
          return (false)
      }
      
      

