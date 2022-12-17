import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Order} from "../../../../shared/models/order.model";
import {OrderService} from "../../../../shared/services/order.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  orderId : string =''
  orders: Order = {};

  constructor(
    private orderService : OrderService,

    private Activeroute : ActivatedRoute,
  ) {
    this.Activeroute.paramMap.subscribe((res) => {
      this.orderId = res.get('id') || '';
    })
  }

  ngOnInit(): void {
    this.loadData(this.orderId)
  }

  loadData (id : string) {
    this.orderService.findOne(id, true).subscribe((res:any) => {
      this.orders = res.body?.data
      console.log(this.orders)
    })
  }

  intoMoney (price ?: number, amount?: number) :any{
    // @ts-ignore
    return price * amount ;
  }
}
