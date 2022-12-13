import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {IProduct} from "../../../shared/models/product.model";
import {ActivatedRoute} from "@angular/router";
import {ISize, ISizeProduct} from "../../../shared/models/size.model";
import {FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Cart} from "../../../shared/models/cart.model";
import {CartService} from "../../../shared/services/cart.service";
import {Category} from "../../../shared/models/category.model";
import {CategoryService} from "../../../shared/services/category.service";
import {LocalStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  isChosseRadio =false;
  isChosseRadio2 =false;
  lengthSize =0;
  size : ISizeProduct ={};
  salePrice =[];
  imageUrl?: any;
  categories : Category[]=[];
  productId = '';
  sizes : ISizeProduct[] =[];
  productDetail : IProduct = {}
  totalQuantity =0;
  form: FormGroup = new FormGroup({});
  input_quantity= 1;
  constructor(
    private productService : ProductService,
    private router: ActivatedRoute,
    private toast: ToastrService,
    private categoryService: CategoryService,
    private cartService : CartService,
    private localStorage : LocalStorageService
  ) {
    this.router.paramMap.subscribe((res) => {
      this.productId = res.get('id') || '';
    });
  }

  ngOnInit(): void {
    this.loadDataCategory();
    this.loadData(this.productId);
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
  loadData(id :string): void {
    this.productService.detail(id).subscribe((respone: any)=> {
      this.productDetail =respone.body?.data;
      console.log(respone)
      console.log(this.productDetail)
      // @ts-ignore
      this.imageUrl = this.productDetail.productImages[0]?.imageUrl;
      // @ts-ignore
      this.sizes = this.productDetail.productSizes;
      this.lengthSize = this.sizes.length -1;
      this.sizes.forEach((item) => {
        this.totalQuantity =this.totalQuantity + (item.quantity ? item.quantity : 0);
      });
    })
  }

  addToCart(): void {
    let quantity: any = this.size.quantity +''
    const id = this.localStorage.retrieve("profile").userId;
    const cart :Cart = {
      //needFix
      userId : id,
      amount : this.input_quantity,
      productId :this.productId,
      sizeId: this.size.sizeId
    }

    this.isChosseRadio2 =false;
    if (this.checkedRadio(this.size)){
      this.isChosseRadio2=true;
      this.toast.error('Vui lòng chọn size trước!')
      return
    }
    if(this.input_quantity > quantity) {
      this.toast.error("Sản phẩm không đủ")
    }else {
      this.cartService.addToCart(cart).subscribe(()=>{
        this.toast.success('Thêm vào giỏ hàng thành công');
      })
    }
  }



  checkedRadio(size: ISizeProduct): boolean{
    this.isChosseRadio = (Object.getOwnPropertyNames(this.size).length === 0);
    return this.isChosseRadio
  }

}
