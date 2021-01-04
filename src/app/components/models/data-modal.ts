
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

export class Tag {
    id: number = 0;
    name: string = '';
    post_id: number = 0;
    //  description:string='';
}

export class Category {
    id: number = 0;
    name: string = '';
    description: string = '';
}

export class Contact_Message {
    name: string = "";
    email: string = "";
    mobile: number = 0;
    message: string = "";

}

export function isEmailValid(email: string) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
}

export function removeTheme() {
    const mainCss = document.getElementById("theme")?.remove();
}

export function addTheme() {
    const header = document.getElementsByTagName("header")
    header.namedItem
}

export function allLetter(inputtxt: string) {

    //var letters = /^[A-Za-z]+$/;
    var letters = /^[a-zA-Z\s]+$/;
    if (inputtxt === '' || inputtxt === undefined) {
        //alert("Msg");
        return false;
    }
    else {
        if (inputtxt.match(letters)) {
            return true;
        }
        else {
            // alert("message");
            return false;
        }
    }

}

export function checkToken(token: string) {
       console.log("Token check");
        if (token === "Invalid Token") {
            return false;
        }
        else {
            return true;
        }
   }
   
export function isEmpty(obj :Object) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}



