import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {OrderService} from "../../../shared/services/order.service";
import {Order, StatusEnum} from "../../../shared/models/order.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-bought',
  templateUrl: './bought.component.html',
  styleUrls: ['./bought.component.scss']
})
export class BoughtComponent implements OnInit {
  orders: Order[] = [];
  status = '';
  constructor(
    private router: Router,
    private orderService :OrderService,
    private toast : ToastrService,
  ) { }

  ngOnInit(): void {
    this.showAll();
  }

  showAll(): void {
    this.status= '';
    const idUser = 'be2d6163-7979-40fb-a149-dca33bacad1a'
    this.orderService.showByBought(this.status,idUser).subscribe((res :any) => {
      this.orders = res.body?.data;
    })
  }

  showWaitConfirm(): void {
     this.status= 'CHO_XAC_NHAN'
    const idUser = 'be2d6163-7979-40fb-a149-dca33bacad1a'
    this.orderService.showByBought(this.status,idUser).subscribe((res :any) => {
      this.orders = res.body?.data;
    })
  }

  showConfirmed(): void {
    this.status= 'XAC_NHAN'
    const idUser = 'be2d6163-7979-40fb-a149-dca33bacad1a'
    this.orderService.showByBought(this.status,idUser).subscribe((res :any) => {
      this.orders = res.body?.data;
    })
  }
  showDelivering(): void {
    this.status= 'DANG_GIAO'
    const idUser = 'be2d6163-7979-40fb-a149-dca33bacad1a'
    this.orderService.showByBought(this.status,idUser).subscribe((res :any) => {
      this.orders = res.body?.data;
    })
  }
  showDelivered(): void {
    this.status= 'DA_GIAO'
    const idUser = 'be2d6163-7979-40fb-a149-dca33bacad1a'
    this.orderService.showByBought(this.status,idUser).subscribe((res :any) => {
      this.orders = res.body?.data;
    })
  }
  showCancel(): void {
    this.status= 'HUY'
    const idUser = 'be2d6163-7979-40fb-a149-dca33bacad1a'
    this.orderService.showByBought(this.status,idUser).subscribe((res :any) => {
      this.orders = res.body?.data;
    })
  }

  updateHuyDon(id : any) {
    console.log(id)
    const jsonUpdate = {
      status : StatusEnum.HUY
    }
    this.orderService.updateOrder(id,jsonUpdate).subscribe((res :any) => {
      this.toast.success('Đơn đã hủy');
      this.showWaitConfirm()
    });
  }

  muaLaiDonHang(id : any) {
    console.log(id)

  }
}
