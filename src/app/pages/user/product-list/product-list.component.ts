import { Component, OnInit } from '@angular/core';
import {IProduct, Product} from "../../../shared/models/product.model";
import {PAGINATION} from "../../../shared/constants/pagination.constants";
import {ProductSearchRequest} from "../../../shared/models/request/product-search-request.model";
import {ProductService} from "../../../shared/services/product.service";
import {ROUTER_UTILS} from "../../../shared/utils/router.utils";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  productSearchRequest: ProductSearchRequest = {
    pageIndex: PAGINATION.PAGE_DEFAULT,
    pageSize: PAGINATION.SIZE_DEFAULT,
  };
  pageNumber = PAGINATION.PAGE_DEFAULT;
  pageSize = PAGINATION.SIZE_DEFAULT;
  total = 0;

  constructor(
    private productService: ProductService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loadData(this.pageNumber, this.pageSize);
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
        console.log(response);
        console.log(this.products);
      });
  }

  showProductDetail(product: IProduct): void {
    this.router.navigate([ROUTER_UTILS.product.root, product.productId, 'detail']);
  }
}
