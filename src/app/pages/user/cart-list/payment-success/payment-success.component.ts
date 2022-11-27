import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IProductOrder, OrderType, PaymentMethod, StatusEnum} from "../../../../shared/models/order.model";
import {CartService} from "../../../../shared/services/cart.service";
import {ICartDetail} from "../../../../shared/models/cart-detail.model";
import {Ship} from "../../../../shared/models/ship.model";
import {OrderService} from "../../../../shared/services/order.service";

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
  shipMoney : any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private cartService :CartService,
    private orderService :OrderService,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.vnp_TransactionStatus= params['vnp_TransactionStatus'];
      console.log(params)
      console.log(this.vnp_TransactionStatus)
    });
  }

  ngOnInit(): void {
    if(this.vnp_TransactionStatus === '00'){
      const id ='be2d6163-7979-40fb-a149-dca33bacad1a';
      this.loadDataCart(id);
      this.createOrder();

    } else {

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
        console.log(this.total)
        this.chargeShipping(this.total);
      }
      console.log(this.shipMoney)
      console.log(this.total)
      this.createOrder();
    })

  }

  chargeShipping(total: number) {
    this.ship.service_id = 53320;
    this.ship.insurance_value = total;
    this.ship.from_district_id =3440;
    this.ship.to_district_id = 1542;
    this.ship.to_ward_code = "1B1517";
    this.ship.height=10;
    this.ship.length=10;
    this.ship.weight = 1000;
    this.ship.width =10;
    this.cartService.chargeShipping(this.ship).subscribe((respone) =>{
      this.shipMoney = respone.data.total;
    })
  }

  createOrder() : void{
    console.log(this.carts)
    const order = {
      customerMoney: 1,
      paymentMethod: PaymentMethod.CARD,
      transportFee: 1,
      purchaseType: OrderType.ONLINE,
      status: StatusEnum.CHO_XAC_NHAN,
      eventId: "2b052354-f0a4-4815-8cc6-fb6c957bfa55",
      address: "NN",
      userId: "be2d6163-7979-40fb-a149-dca33bacad1a",
      total: this.total ,

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
        console.log("thanh cong vcll")
    })

  }
}
