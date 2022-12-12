import { Component, OnInit } from '@angular/core';
import {Category, ICategory} from "../../../shared/models/category.model";
import {CategoryService} from "../../../shared/services/category.service";
import {IProduct, Product} from "../../../shared/models/product.model";
import {ROUTER_UTILS} from "../../../shared/utils/router.utils";
import {Router} from "@angular/router";
import {ProductService} from "../../../shared/services/product.service";
import {IProductSearchRequest, ProductSearchRequest} from "../../../shared/models/request/product-search-request.model";
import {PAGINATION} from "../../../shared/constants/pagination.constants";
import {forEach} from "lodash";
import {Cart} from "../../../shared/models/cart.model";
import {CartService} from "../../../shared/services/cart.service";
import {ToastrService} from "ngx-toastr";
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories : Category[]=[];
  newProducts : IProduct[]=[];
  productTrending : IProduct[]=[];
  products: IProduct[] = [];
  productSearchRequest: IProductSearchRequest = {
    pageIndex: PAGINATION.PAGE_DEFAULT,
    pageSize: 8,
  };

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private cartService : CartService,
    private toast: ToastrService,
    private router : Router,
    private $localstorage:LocalStorageService
  ) {
  }

  ngOnInit(): void {
    const role = this.$localstorage.retrieve('role');
    console.log(role);
    this.loadDataCategory();
    this.loadDataByCategoryAndProduct()
    this.showNewProduct();
    this.showProductTrending();
  }

  loadDataByCategoryAndProduct(categoryId?: string) {
    this.productSearchRequest.categoryId = categoryId;
    this.productService.search(this.productSearchRequest).subscribe((response: any) => {
      this.products = response.body?.data;
    });
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
  showProductByCate(Idcate?: string): void {
    this.router.navigate([ROUTER_UTILS.product.root, Idcate, 'cate']);
  }

  showProductDetail(product: IProduct): void {
    this.router.navigate([ROUTER_UTILS.product.root, product.productId, 'detail']);
  }

  showNewProduct(): void {
    const request : ProductSearchRequest= {
      pageSize: 4,
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


  showProductTrending(): void {
    this.productService.trending().subscribe((res :any) =>{
        this.productTrending = res.body?.data;
    });
  }

  addToCart ( product : any): void {
    const cart : Cart = {
      userId : 'be2d6163-7979-40fb-a149-dca33bacad1a',
      amount : 1,
      productId : product.productId,
      sizeId: product.productSizes[0].sizeId
    }
    console.log(cart)
    this.cartService.addToCart(cart).subscribe(()=>{
      this.toast.success('Thêm vào giỏ hàng thành công');
    },
    (error: any)=>{
      this.toast.error('Thêm vào giỏ hàng thất bại');
    }
    )
  }

}
