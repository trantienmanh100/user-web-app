import { Component, OnInit } from '@angular/core';
import {IProduct, Product} from "../../../shared/models/product.model";
import {PAGINATION} from "../../../shared/constants/pagination.constants";
import {IProductSearchRequest, ProductSearchRequest} from "../../../shared/models/request/product-search-request.model";
import {ProductService} from "../../../shared/services/product.service";
import {ROUTER_UTILS} from "../../../shared/utils/router.utils";
import {ActivatedRoute, Router} from "@angular/router";
import {Category} from "../../../shared/models/category.model";
import {CategoryService} from "../../../shared/services/category.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  productSearchRequest: IProductSearchRequest = {
    pageIndex: PAGINATION.PAGE_DEFAULT,
    pageSize: PAGINATION.SIZE_DEFAULT,
  };
  categories: Category[] = [];
  categoryId = '';

  pageNumber = PAGINATION.PAGE_DEFAULT;
  pageSize = PAGINATION.SIZE_DEFAULT;
  total = 0;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private Activeroute: ActivatedRoute,

  ) {
    this.Activeroute.paramMap.subscribe((res) => {
      this.categoryId = res.get('id') || '';
    });
  }

  ngOnInit(): void {
    this.loadCategory(),
    // this.loadData(this.pageNumber, this.pageSize);
    this.loadDataByCategory(this.categoryId)
  }

  loadCategory():void {
      this.categoryService.searchCategoriesAutoComplete(true).subscribe((response: any)=> {
        this.categories = response.body?.data
      },
      (error: any) => {
      this.categories = [];
    })
  }

  loadData(pageIndex: number, pageSize: number, sortBy?: string) {

    this.productSearchRequest.pageIndex = pageIndex;
    this.productSearchRequest.pageSize = pageSize;
    this.productSearchRequest.sortBy = sortBy;
    this.productService
      .search(this.productSearchRequest)
      .subscribe((response: any) => {
        this.products = response.body?.data;
        this.total = response.body.page.total;
      });
  }

  loadDataByCategory(categoryId?: string) {
    this.products = [];
    this.productSearchRequest.categoryId = categoryId;
    console.log(categoryId)
    this.productService.search(this.productSearchRequest).subscribe((response: any) => {
        this.products = response.body?.data;
        this.total = response.body.page.total;

    });
  }

  showProductDetail(product: IProduct): void {
    this.router.navigate([ROUTER_UTILS.product.root, product.productId, 'detail']);
  }
}
