import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ROUTER_UTILS} from "../../../shared/utils/router.utils";
import {OrderService} from "../../../shared/services/order.service";
import {ICartDetail} from "../../../shared/models/cart-detail.model";
import {IOrderItem} from "../../../shared/models/order.model";

@Component({
  selector: 'app-bought',
  templateUrl: './bought.component.html',
  styleUrls: ['./bought.component.scss']
})
export class BoughtComponent implements OnInit {
  orders: IOrderItem[] = [];

  constructor(
    private router: Router,
    private orderService :OrderService,
  ) { }

  ngOnInit(): void {
  }

  showWaitConfirm(): void {
    const status= 'CHO_XAC_NHAN'
    const idUser = 'be2d6163-7979-40fb-a149-dca33bacad1a'
    this.orderService.findStatusAndUserId(status,idUser).subscribe((res :any) => {
      console.log(res)
    })

  }
  showWaitGoods(): void {
    this.router.navigate([ROUTER_UTILS.bought.waitgoods]);
  }
  showChange(): void {
    this.router.navigate([ROUTER_UTILS.refund.list]);
  }
}
