import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {OrderService} from "../../../shared/services/order.service";
import {IProductOrder, Order, OrderType, PaymentMethod, StatusEnum} from "../../../shared/models/order.model";
import {ToastrService} from "ngx-toastr";
import CommonUtil from "../../../shared/utils/common-utils";
import {TranslateService} from "@ngx-translate/core";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {result} from "lodash";
import {LocalStorageService} from "ngx-webstorage";
import {CartService} from "../../../shared/services/cart.service";
import {Cart} from "../../../shared/models/cart.model";
import {ROUTER_UTILS} from "../../../shared/utils/router.utils";


@Component({
  selector: 'app-bought',
  templateUrl: './bought.component.html',
  styleUrls: ['./bought.component.scss']
})
export class BoughtComponent implements OnInit {
  orders: Order[] = [];
  status = '';
  userId = this.localStorage.retrieve("profile").userId;
  constructor(
    private router: Router,
    private orderService :OrderService,
    private toast : ToastrService,
    private translateService: TranslateService,
    private modalService: NzModalService,
    private cartService : CartService,
    private localStorage : LocalStorageService

  ) { }

  ngOnInit(): void {
    this.showAll();
  }

  showAll(): void {
    this.status= '';
    this.orderService.showByBought(this.status,this.userId).subscribe((res :any) => {
      this.orders = res.body?.data;
    })
  }

  showWaitConfirm(): void {
     this.status= 'CHO_XAC_NHAN'
    this.orderService.showByBought(this.status,this.userId).subscribe((res :any) => {
      this.orders = res.body?.data;
    })
  }

  showConfirmed(): void {
    this.status= 'XAC_NHAN'
    this.orderService.showByBought(this.status,this.userId).subscribe((res :any) => {
      this.orders = res.body?.data;
    })
  }
  showDelivering(): void {
    this.status= 'DANG_GIAO'
    this.orderService.showByBought(this.status,this.userId).subscribe((res :any) => {
      this.orders = res.body?.data;
    })
  }
  showDelivered(): void {
    this.status= 'DA_GIAO'
    this.orderService.showByBought(this.status,this.userId).subscribe((res :any) => {
      this.orders = res.body?.data;
    })
  }
  showCancel(): void {
    this.status= 'HUY'
    this.orderService.showByBought(this.status,this.userId).subscribe((res :any) => {
      this.orders = res.body?.data;
    })
  }

  updateHuyDon(id : any) {
    const jsonUpdate = {
    status : StatusEnum.HUY
    }
    const huydon =CommonUtil.modalConfirm(
      this.translateService,
      'Hủy đơn hàng',
      'Bạn có muốn hủy đơn hàng này không',
      {name: 'a'}
    )
    const modal: NzModalRef =this.modalService.create(huydon);
    modal.afterClose.subscribe((result:{success: boolean; data: any}) =>{
      if(result?.success){
        this.orderService.updateOrder(id,jsonUpdate).subscribe((res :any) => {
          this.toast.success('Đơn hàng đã hủy');
          this.showWaitConfirm()
        });
      }
    })
  }

  muaLaiDonHang(id : any) {
    this.orderService.findOne(id).subscribe((res:any)=> {
      const Doncu = res.body?.data
      const order = {
        orderDetailList: Doncu.orderDetailDTOList.map((res:any) => {
          const productDetail: Cart = {
            userId : 'be2d6163-7979-40fb-a149-dca33bacad1a',
            amount :res.quantity,
            productId :res.productId,
            sizeId: res.sizeId
          };
          this.cartService.addToCart(productDetail).subscribe(()=>{
            this.router.navigate(['/cart/list'])

          })
        }),
      };
    })
  }

  showChiTiet(id : any){
    this.router.navigate([ROUTER_UTILS.detail.root,id,'detail'])
  }

}
