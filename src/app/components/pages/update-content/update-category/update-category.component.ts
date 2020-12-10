import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
items:any=[];
itemsRecords:number=0;
page:number=1;
  constructor() { }

  ngOnInit(): void {
    this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`, description: `Item ${i + 1}`}));
    this.itemsRecords=this.items.length;
  }

  onEdit(id:number){
    console.log(id);
  }

}
