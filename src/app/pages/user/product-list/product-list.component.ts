import { Component, OnInit } from '@angular/core';
import {IProduct, Product} from "../../../shared/models/product.model";
import {PAGINATION} from "../../../shared/constants/pagination.constants";
import {IProductSearchRequest, ProductSearchRequest} from "../../../shared/models/request/product-search-request.model";
import {ProductService} from "../../../shared/services/product.service";
import {ROUTER_UTILS} from "../../../shared/utils/router.utils";
import {ActivatedRoute, Router} from "@angular/router";
import {Category, ICategory} from "../../../shared/models/category.model";
import {CategoryService} from "../../../shared/services/category.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  productTrending : IProduct[]=[];
  productSearchRequest: IProductSearchRequest = {
    pageIndex: PAGINATION.PAGE_DEFAULT,
    pageSize: PAGINATION.SIZE_DEFAULT,
  };
  categories: Category[] = [];
  categoryId? : string;
  categoryById : ICategory= {};
  pageIndex = PAGINATION.PAGE_DEFAULT;
  pageSize = PAGINATION.SIZE_DEFAULT;
  total = 0;

  constructor(
    private translateService: TranslateService,
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
    this.loadNameCate(),
    this.loadCategory(),
    // this.loadData(this.pageNumber, this.pageSize);
   // this.showProductTrending()
    this.loadDataByCategory(this.categoryId)
  }

  loadNameCate(){
    this.categoryService.findByCategoryId(this.categoryId+'').subscribe((res:any) => {
      this.categoryById = res.body?.data;
      console.log(this.categoryById)
    })
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
    this.productService.search(this.productSearchRequest).subscribe((response: any) => {
        this.products = response.body?.data;
        this.total = response.body.page.total;

    });
  }

  showProductTrending(): void {
    this.productService.trending().subscribe((res :any) =>{
      this.productTrending = res.body?.data;
    });
  }

  showProductDetail(product: IProduct): void {
    this.router.navigate([ROUTER_UTILS.product.root, product.productId, 'detail']);
  }

  onQuerySearch(params: any): void {
    const { pageIndex, pageSize } = params;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.loadData(this.pageIndex, this.pageSize);
  }
}
