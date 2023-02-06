import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Order} from "../../../../shared/models/order.model";
import {OrderService} from "../../../../shared/services/order.service";
import {EventService} from "../../../../shared/services/event.service";
import {IEventSearchRequest} from "../../../../shared/models/request/event-search-request.model";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  orderId : string =''
  orders: Order = {};
  event: any;
  eventSearchRequest: IEventSearchRequest = {

  };

  constructor(
    private orderService : OrderService,
    private Activeroute : ActivatedRoute,
    private  eventService: EventService
  ) {
    this.Activeroute.paramMap.subscribe((res) => {
      this.orderId = res.get('id') || '';
    })
  }

  ngOnInit(): void {
    this.loadData(this.orderId)
  }

  giamGia(evetId : any){
    console.log(evetId)
   // this.eventSearchRequest.keyword  =evetId
   //  this.eventService.search(this.eventSearchRequest).subscribe((res:any)=>{
   //    this.event = res.body.data
   //    console.log(this.event);
   //  })
  }

  loadData (id : string) {
    this.orderService.findOne(id, true).subscribe((res:any) => {
      this.orders = res.body?.data
      console.log(this.orders+'alo')
      console.log(res.body?.data)
      this.giamGia(this.orders.eventId);
    })
  }

  intoMoney (price ?: number, amount?: number) :any{
    // @ts-ignore
    return price * amount ;
  }
}
