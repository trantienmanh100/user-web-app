import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {IProduct} from "../../../shared/models/product.model";
import {ActivatedRoute} from "@angular/router";
import {ISize, ISizeProduct} from "../../../shared/models/size.model";
import {FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Cart} from "../../../shared/models/cart.model";
import {CartService} from "../../../shared/services/cart.service";

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
  productId = '';
  sizes : ISizeProduct[] =[];
  productDetail : IProduct = {}
  totalQuantity =0;
  form: FormGroup = new FormGroup({});
  constructor(
    private productService : ProductService,
    private router: ActivatedRoute,
    private toast: ToastrService,
    private cartService : CartService,
  ) {
    this.router.paramMap.subscribe((res) => {
      this.productId = res.get('id') || '';
    });
  }

  ngOnInit(): void {
    this.loadData(this.productId);
  }

  loadData(id :string): void {
    this.productService.detail(id).subscribe((respone: any)=> {
      this.productDetail =respone.body?.data;
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
    const cart :Cart = {
      //needFix
      userId : 'be2d6163-7979-40fb-a149-dca33bacad1a',
      amount : 1,
      productId :this.productId,
      sizeId: this.size.sizeId
    }
    this.isChosseRadio2 =false;
    if (this.checkedRadio(this.size)){
      this.isChosseRadio2=true;
      this.toast.error('Vui lòng chọn size trước!')
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
