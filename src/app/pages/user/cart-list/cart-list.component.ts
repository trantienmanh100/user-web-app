import {Component, OnInit, ViewChild} from '@angular/core';
import {CartService} from "../../../shared/services/cart.service";
import {Cart, ICart} from "../../../shared/models/cart.model";
import {ProductService} from "../../../shared/services/product.service";
import {IProduct, Product} from "../../../shared/models/product.model";
import CommonUtil from "../../../shared/utils/common-utils";
import {TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {IEvent} from "../../../shared/models/event.model";
import {EventService} from "../../../shared/services/event.service";

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  eventId : string ='';
  carts: Cart[] = [];
  events: IEvent[] = [];
  img = '';
  product :Product = {};
  productId ?: string = '';
  constructor(
    private cartService :CartService,
    private productService: ProductService,
    private translateService: TranslateService,
    private modalService: NzModalService,
    private toast: ToastrService,
    private eventService : EventService,
  ) { }

  ngOnInit(): void {
    const id ='02951d3d-1045-4fa1-ad46-6edeffd04a3d';
    this.loadData(id)
    this.loadEvent();
  }

  loadData(id: string): void {
    this.cartService.search(id, true).subscribe((res :any)=>{
      this.carts = res.body?.data;
    })
  }
  loadEvent(): void {
    this.eventService.getAll().subscribe((res: any) => {
      this.events = res.body?.data;
    });
  }
  loadProduct(productId :any) : Product {
    this.productService.detail(productId).subscribe((respone: any )=>{
        const data =respone?.body?.data;
        this.product =data;
        // @ts-ignore
        this.img = this.product?.productImages[0]?.imageUrl;
    },
      (error: any) => {
        this.product = {};
      })
    return this.product;
  }

  addQuantity(cart : ICart): void {
    // let amount: number =0;
    // // @ts-ignore
    // amount = cart.amount + 1;
    // this.cartService.updateQuantity(cart.cartId.,amount,cart ).subscribe((res: any) =>{
    //   if (cart?.cartId != null) {
    //     this.loadData(cart?.cartId);
    //   }
    // })
  }

  minusQuantity(cart : ICart): void {
    // let amount: number =0;
    // // @ts-ignore
    // amount = cart.amount - 1;
    // this.cartService.updateQuantity(cart.id,amount,cart ).subscribe((res: any) =>{
    //   if (cart?.cartId != null) {
    //     this.loadData(cart?.cartId);
    //   }
    // })
  }

  delete(cart: ICart) :void {
    // const deleteForm =CommonUtil.modalConfirm(
    //   this.translateService,
    //   'Xoá sản phẩm khỏi giỏ',
    //   'Bạn có muốn xoá sản phẩm này không',
    //   {name: 'a'}
    //   //need fix
    // )
    // const modal: NzModalRef =this.modalService.create(deleteForm);
    // modal.afterClose.subscribe((result: {success: boolean; data: any}) =>{
    //   if(result?.success){
    //     this.cartService.deleteCartDetail(cart.id).subscribe((respone: any) =>{
    //       this.toast.success('Xoá thành công sản phẩm khỏi giỏ hàng');
    //       this.loadData(cart?.cartId || '');
    //     });
    //   }
    // });
  }

  getTotal(eventId: any) {
  }
  // loadProductSize(){
  //   this.productService.detail(productId).subscribe((respone: any )=>{
  //     this.product =respone.body?.data;
  //   })
  //   return this.product;
  // }

}
