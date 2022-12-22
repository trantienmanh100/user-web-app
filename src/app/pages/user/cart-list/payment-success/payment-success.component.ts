import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IProductOrder, OrderType, PaymentMethod, StatusEnum} from "../../../../shared/models/order.model";
import {CartService} from "../../../../shared/services/cart.service";
import {ICartDetail} from "../../../../shared/models/cart-detail.model";
import {Ship} from "../../../../shared/models/ship.model";
import {OrderService} from "../../../../shared/services/order.service";
import {LocalStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {
  vnp_TransactionStatus ='';
  carts: ICartDetail[] = [];
  total = 0;
  ship: Ship ={};
  constructor(
    private activatedRoute: ActivatedRoute,
    private cartService :CartService,
    private orderService :OrderService,
    private localStorage: LocalStorageService,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.vnp_TransactionStatus= params['vnp_TransactionStatus'];
    });
  }

  ngOnInit(): void {
    if(this.vnp_TransactionStatus === '00'){
      const userId = this.localStorage.retrieve("profile").userId;
      this.loadDataCart(userId);
    }
  }

  loadDataCart(id: string): void {
    this.cartService.search(id, true).subscribe((res :any)=>{
      if(res && res.body.data !== null){
        this.carts = res.body?.data?.cartDetailResponseList;
        this.total =0;
        this.carts.forEach((item)=>{
          if(item.price && item.amount) {
            this.total += item.price*item.amount;
          }
        });
      }

      const ship =Number (localStorage.getItem('shipMoney'))  ;
      this.total += ship
      if(localStorage.getItem('online') === 'online'){
        this.createOrder();
        localStorage.removeItem('online');
        localStorage.removeItem('shipMoney');
        const userId = this.localStorage.retrieve("profile").userId;
        // this.cartService.deleteCart(userId).subscribe((res :any) => {
        //
        // });
        // console.log(this.carts)
      }
    })

  }


  createOrder() : void{
    const id = this.localStorage.retrieve("profile").userId;
    const ship =Number (localStorage.getItem('shipMoney'))  ;
    const discount= Number(localStorage.getItem('discount')) ;
    const eventIdSave= localStorage.getItem('eventId');
    const order = {
      customerMoney: 1,
      paymentMethod: PaymentMethod.CARD,
      transportFee: ship,
      eventId: eventIdSave,
      purchaseType: OrderType.ONLINE,
      status: StatusEnum.CHO_XAC_NHAN,
      address: localStorage.getItem('address'),
      userId: id,
      total: this.total - discount  ,

      orderDetailList: this.carts.map((res) => {
        const price = res.price as number;
        const productDetail: IProductOrder = {
          productId: res.productId,
          quantity: res.amount,
          price: res.price,
          sizeId: res.sizeId,
          total: ((res.amount as number) * price) as number,
        };
        return productDetail;
      }),
    };
    this.orderService.createOrder(order).subscribe(() => {
      this.cartService.deleteCart(id).subscribe(()=>{
      });
    })
  }
}
