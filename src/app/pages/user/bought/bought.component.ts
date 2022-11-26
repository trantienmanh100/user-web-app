import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ROUTER_UTILS} from "../../../shared/utils/router.utils";
import {OrderService} from "../../../shared/services/order.service";
import {ICartDetail} from "../../../shared/models/cart-detail.model";
import {IOrder, IOrderItem, IProductOrder, Order, ProductOrder} from "../../../shared/models/order.model";

@Component({
  selector: 'app-bought',
  templateUrl: './bought.component.html',
  styleUrls: ['./bought.component.scss']
})
export class BoughtComponent implements OnInit {
  order: Order[] = [];
  constructor(
    private router: Router,
    private orderService :OrderService,
  ) { }

  ngOnInit(): void {
    this.showAll();
  }

  showAll(): void {
    const status= '';
    const idUser = 'be2d6163-7979-40fb-a149-dca33bacad1a'
    this.orderService.showByBought(status,idUser).subscribe((res :any) => {
      this.order = res.body?.data;
      console.log(this.order)
    })
  }

  showWaitConfirm(): void {
    const status= 'CHO_XAC_NHAN'
    const idUser = 'be2d6163-7979-40fb-a149-dca33bacad1a'
    this.orderService.showByBought(status,idUser).subscribe((res :any) => {
      this.order = res.body?.data;
    })
  }

  showConfirmed(): void {
    const status= 'XAC_NHAN'
    const idUser = 'be2d6163-7979-40fb-a149-dca33bacad1a'
    this.orderService.showByBought(status,idUser).subscribe((res :any) => {
      this.order = res.body?.data;
    })
  }
  showDelivering(): void {
    const status= 'DANG_GIAO'
    const idUser = 'be2d6163-7979-40fb-a149-dca33bacad1a'
    this.orderService.showByBought(status,idUser).subscribe((res :any) => {
      this.order = res.body?.data;
    })
  }
  showDelivered(): void {
    const status= 'DA_GIAO'
    const idUser = 'be2d6163-7979-40fb-a149-dca33bacad1a'
    this.orderService.showByBought(status,idUser).subscribe((res :any) => {
      this.order = res.body?.data;
    })
  }
  showCancel(): void {
    const status= 'HUY'
    const idUser = 'be2d6163-7979-40fb-a149-dca33bacad1a'
    this.orderService.showByBought(status,idUser).subscribe((res :any) => {
      this.order = res.body?.data;
    })
  }
}
