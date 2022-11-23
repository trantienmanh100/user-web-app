import { Component, OnInit } from '@angular/core';
import {Category, ICategory} from "../../../shared/models/category.model";
import {CategoryService} from "../../../shared/services/category.service";
import {IProduct} from "../../../shared/models/product.model";
import {ROUTER_UTILS} from "../../../shared/utils/router.utils";
import {Router} from "@angular/router";
import {ProductService} from "../../../shared/services/product.service";
import {ProductSearchRequest} from "../../../shared/models/request/product-search-request.model";
import {PAGINATION} from "../../../shared/constants/pagination.constants";
import {forEach} from "lodash";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories : Category[]=[];
  newProducts : IProduct[]=[];
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router : Router,
  ) {
  }

  ngOnInit(): void {
    this.loadDataCategory();
    this.showNewProduct()
  }
  loadDataCategory(): void {
    this.categoryService.searchCategoriesAutoComplete( true).subscribe(
      (response: any) => {
        const data = response?.body?.data;
        this.categories = data;
      },
      (error: any) => {
        this.categories = [];
      }
    );

  }
  showProductByCate(cate: ICategory): void {
    this.router.navigate([ROUTER_UTILS.product.root, cate.categoryId, 'cate']);
  }

  showNewProduct(): void {
    const request : ProductSearchRequest= {
      pageSize: 5,
      sortBy: "createAt.desc",
    };
    this.productService.search(request).subscribe((res :any) =>{
      if(res){
        this.newProducts = res.body?.data;
        this.newProducts.forEach((product:IProduct)=>{
          // @ts-ignore
          product.currentImg = product.productImages[0].imageUrl;
          // @ts-ignore
          product.secondImg =product.productImages[1].imageUrl;
          // @ts-ignore
          product.firstImg =product.productImages[0].imageUrl;
          console.log(product)
        })
      }
    });
  }
}
