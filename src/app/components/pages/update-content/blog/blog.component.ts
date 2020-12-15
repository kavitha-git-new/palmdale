import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { DataService } from 'src/app/components/services/data.service';
import { ModalService } from 'src/app/components/_modal';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  items: any = [];
  itemsRecords: number = 0;
  page: number = 1;
  btnName: string = "Save";
  blog: any = {};

  tags: any = [];
  categories: any = [];
  item: any = [];
  title: string = "";
  titleDescription: string = "";

  constructor(private modalService: ModalService, private dataService: DataService) { }

  ngOnInit(): void {
    this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`, description: `Item ${i + 1}` }));
    this.itemsRecords = this.items.length;
  }

  onEdit(id: number) {
    this.blog.errMsg = "";
    this.title = "Edit";
    this.titleDescription = "Edit details about the blog to update.";
    this.btnName = "Update"
    this.blog.id = id;
    this.dataService.getBlog(id).subscribe(element => { this.blog = element });
    console.log(id);
    //to fill all the dropdowns

    this.dataService.getTags().subscribe(element => {
      this.tags = element;
    });

    this.dataService.getCategories().subscribe(element => {
      this.categories = element;
    });

    this.dataService.getItems().subscribe(element => {
      this.items = element;
    })

    this.dataService.getItems().subscribe(element => {
      this.items = element;
    })

    this.modalService.open('exampleModal');
  }

  onAdd(btName: string) {
    this.title = "Add";
    this.titleDescription = "Add details about the blog to save.";
    this.btnName = btName;
    this.blog.id = 0;
    this.blog.name = '';
    this.blog.description = '';
    this.blog.content = '';
    this.blog.errMsg = '';

    //to fill all the dropdowns
    this.dataService.getTags().subscribe(element => {
      this.tags = element;
    });

    this.dataService.getCategories().subscribe(element => {
      this.categories = element;
    });
    this.modalService.open('exampleModal');
  }

  saveData(btnName: string) {
    alert("save date in Db.");
  }

  onClose(id: string) {
    this.modalService.close(id)
  }

  onDelete(id: number) {
    console.log(id);
    this.dataService.getBlog(id).subscribe(element => {
      this.blog = element;
    });

    if (confirm("Are you sure? Do you want to delete the details about the blog : " + this.blog.name) === true) {
      this.dataService.onDeleteBlog(id);
      return true;

    }
    else {
      return false;
    }
  }



}
