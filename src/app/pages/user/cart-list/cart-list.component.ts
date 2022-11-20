import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../shared/services/cart.service";
import {ProductService} from "../../../shared/services/product.service";
import {Product} from "../../../shared/models/product.model";
import CommonUtil from "../../../shared/utils/common-utils";
import {TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {IEvent} from "../../../shared/models/event.model";
import {EventService} from "../../../shared/services/event.service";
import {ICartDetail} from "../../../shared/models/cart-detail.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Ship} from "../../../shared/models/ship.model";
import {IProductOrder, Order, OrderType, PaymentMethod, StatusEnum} from "../../../shared/models/order.model";
import {OrderService} from "../../../shared/services/order.service";

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  eventId : string ='';
  selectedProducts: IProductOrder[] = [];
  carts: ICartDetail[] = [];
  events: IEvent[] = [];
  img = '';
  shipMoney : any;
  product :Product = {};
  ship: Ship ={};
  discount = 0;
  thanhtien = 0;
  total = 0;
  productId ?: string = '';
  constructor(
    private fb: FormBuilder,
    private cartService :CartService,
    private orderService :OrderService,
    private productService: ProductService,
    private translateService: TranslateService,
    private modalService: NzModalService,
    private toast: ToastrService,
    private eventService : EventService,
  ) { }

  ngOnInit(): void {
    const id ='be2d6163-7979-40fb-a149-dca33bacad1a';

    this.loadData(id)
    this.loadEvent();
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      eventId: [null],
    });
    this.form.get('total')?.setValue(0);
  }

  loadData(id: string): void {
    this.cartService.search(id, true).subscribe((res :any)=>{
      this.carts = res.body?.data.cartDetailResponseList;
      this.total =0;
       this.carts.forEach((item)=>{
         if(item.price && item.amount) {
           this.total += item.price*item.amount;
         }
      });
      this.chargeShipping(this.total);
    })
  }
  loadEvent(): void {
    this.eventService.getAll().subscribe((res: any) => {
      this.events = res.body?.data;
    });
  }

  intoMoney (price ?: number, amount?: number) :any{
    // @ts-ignore
    return price * amount ;
  }

  addQuantity(cart : ICartDetail): void {
    let amount: number =0;
    // @ts-ignore
    amount = cart.amount + 1;
    this.cartService.updateQuantity(cart?.cartDetailId,amount,cart ).subscribe((res: any) =>{
      if (cart?.cartDetailId != null) {
        const id ='be2d6163-7979-40fb-a149-dca33bacad1a';
        this.loadData(id);
      }
    })
  }

  minusQuantity(cart : ICartDetail): void {
    let amount: number =0;
    // @ts-ignore
    amount = cart.amount - 1;
    this.cartService.updateQuantity(cart?.cartDetailId,amount,cart ).subscribe((res: any) =>{
      if (cart?.cartDetailId != null) {
        const id ='be2d6163-7979-40fb-a149-dca33bacad1a';
        this.loadData(id);
      }
    })
  }

  delete(cart: ICartDetail) :void {
    const deleteForm =CommonUtil.modalConfirm(
      this.translateService,
      'Xoá sản phẩm khỏi giỏ',
      'Bạn có muốn xoá sản phẩm này không',
      {name: 'a'}
      //need fix
    )
    const modal: NzModalRef =this.modalService.create(deleteForm);
    modal.afterClose.subscribe((result: {success: boolean; data: any}) =>{
      if(result?.success){
        this.cartService.deleteCartDetail(cart.cartDetailId).subscribe((respone: any) =>{
          this.toast.success('Xoá thành công sản phẩm khỏi giỏ hàng');
          const userId ='be2d6163-7979-40fb-a149-dca33bacad1a';
          this.loadData(userId);
        });
      }
    });
  }

  getTotal(eventId: any) {
    const selectEvent = this.events.filter(
      (evn: IEvent) => evn.eventId === eventId
    );
    this.discount = selectEvent.length > 0 ? selectEvent[0].discount : 0;
    this.thanhtien = this.total - (this.total * this.discount) / 100;
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

  createOrder(): void {
    const order = {
      customerMoney: 1,
      paymentMethod: PaymentMethod.CARD,
      transportFee: 1,
      purchaseType: OrderType.ONLINE,
      status: StatusEnum.CHO_XAC_NHAN,
      eventId: "2b052354-f0a4-4815-8cc6-fb6c957bfa55",
      address: "NN",
      userId: "be2d6163-7979-40fb-a149-dca33bacad1a",
      total: this.total - (this.total * this.discount/100) +this.shipMoney,
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
    console.log(this.carts)
    this.orderService.createOrder(order).subscribe(() => {
      this.toast.success('Thêm được order rồi');
    })
    console.log(this.carts)
  }
}
