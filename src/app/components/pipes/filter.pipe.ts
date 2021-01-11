import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {any[]} items
   * @param {string} searchText
   * @returns {any[]}
   */
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();
    console.log(typeof(items));


  /*  for (let item of items) {
      for (let i in item) {
        console.log(typeof(item[i]));
        console.log(item[i].toString().toLowerCase().includes(searchText));
        if(item[i].toString().toLowerCase().includes(searchText))
        return item[i]
      
      }
    


}*/
    return items.filter(it => {

      let key= Object.keys(it).find((key:any) => {it[key].toString().toLocaleLowerCase().includes(searchText.toString().toLocaleLowerCase());
      console.log(it[key].toString().toLocaleLowerCase());
      console.log(searchText.toString().toLocaleLowerCase())
      });
     // console.log(key)
     // console.log(Object.keys(it))
    //  if(key!==undefined)
    console.log(typeof(it));
      if (it.title && it.title.toString().toLowerCase().includes(searchText)) { return it.title.toLowerCase().includes(searchText)  }
      //description
      else if (it.description && it.description.toLowerCase().includes(searchText)) { return it.description.toLowerCase().includes(searchText)  }
      else if(it.fname && it.fname.toLowerCase().includes(searchText))  { return it.fname.toLowerCase().includes(searchText); }
      else if(it.lname && it.lname.toLowerCase().includes(searchText))  { return it.lname.toLowerCase().includes(searchText); }
      else if(it.email && it.email.toLowerCase().includes(searchText)) { return it.email.toLowerCase().includes(searchText); }
      else{ if(it.name && it.name.toLowerCase().includes(searchText)) return it.name.toLowerCase().includes(searchText); }
      
    });



    


  }

}
