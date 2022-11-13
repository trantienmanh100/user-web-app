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
import {ICartDetail} from "../../../shared/models/cart-detail.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  eventId : string ='';
  carts: ICartDetail[] = [];
  events: IEvent[] = [];
  img = '';
  product :Product = {};
  discount = 0;
  thanhtien = 0;
  total = 0;
  productId ?: string = '';
  constructor(
    private fb: FormBuilder,
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
        const id ='02951d3d-1045-4fa1-ad46-6edeffd04a3d';
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
        const id ='02951d3d-1045-4fa1-ad46-6edeffd04a3d';
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
          const userId ='02951d3d-1045-4fa1-ad46-6edeffd04a3d';
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


}
