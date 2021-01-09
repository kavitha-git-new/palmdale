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

    return items.filter(it => {
      if (it.title) { return it.title.toLowerCase().includes(searchText)  }
      if(it.fname)  { return it.fname.toLowerCase().includes(searchText); }
      if(it.lname)  { return it.lname.toLowerCase().includes(searchText); }
      if(it.email) { return it.email.toLowerCase().includes(searchText); }
      else{ return it.name.toLowerCase().includes(searchText); }
    });


  }




}
