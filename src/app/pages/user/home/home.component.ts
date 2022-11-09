import { Component, OnInit } from '@angular/core';
import {Category, ICategory} from "../../../shared/models/category.model";
import {CategoryService} from "../../../shared/services/category.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories : Category[]=[];

  constructor(
    private categoryService: CategoryService,
  ) {
    this.loadDataCategory();
  }

  ngOnInit(): void {
  }
  loadDataCategory(): void {
    this.categoryService.searchCategoriesAutoComplete( true).subscribe(
      (response: any) => {
        const data = response?.body?.data;
        this.categories = data;
        console.log(this.categories)
      },
      (error: any) => {
        this.categories = [];
      }
    );

  }
}
