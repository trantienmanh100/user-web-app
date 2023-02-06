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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Ship} from "../../../shared/models/ship.model";
import {IProductOrder, OrderType, PaymentMethod, StatusEnum} from "../../../shared/models/order.model";
import {OrderService} from "../../../shared/services/order.service";
import {PaymentService} from "../../../shared/services/payment.service";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {Location} from '@angular/common';
import {ROUTER_UTILS} from "../../../shared/utils/router.utils";
import {LocalStorageService} from "ngx-webstorage";
import { CountryService } from 'src/app/shared/services/country.service';
import {DataService} from "../../../shared/services/data.service";


@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  message:string ='';
  count ='';
  isVisible = false;
  isOkLoading = false;
  nodata : boolean = false;
  form: FormGroup = new FormGroup({});
  eventId : string ='';
  pay!:PaymentMethod;
  PaymentMethod = PaymentMethod
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
  checkbox: boolean= false;
  //checkbox
  array:any = []
  tempArrray: any= []
  newArray :any =[];
  province:any[] = [];
  distrist:any[] = [];
  ward:any[] = [];
  idDistrict:number = -1;
  idWard:number = -1;
  addresses:string[] = [];
  isFirst = false;

  ListProductOrder: any[] =[]
  constructor(
    private fb: FormBuilder,
    private cartService :CartService,
    private orderService :OrderService,
    private productService: ProductService,
    private translateService: TranslateService,
    private modalService: NzModalService,
    private toast: ToastrService,
    private eventService : EventService,
    private paymentService : PaymentService,
    private router : Router,
    private location: Location,
    private localStorage: LocalStorageService,
    private countryService:CountryService,
    private data :DataService,

  ) { }

  ngOnInit(): void {
    this.countryService.province().subscribe((res:any)=>{
      this.province = res.data;
      this.initForm();
    })
    const userId = this.localStorage.retrieve("profile").userId;
    this.loadData(userId)
    this.loadEvent();
    this.initForm();
    this.data.currentMessage.subscribe(message => this.message = message);
  }

  private initForm() {
    this.addresses = this.localStorage.retrieve("profile").address?.split(", ") as string[];
    let addressDetail = '';
    let phoneNumber = this.localStorage.retrieve("profile").phoneNumber;
   if( this.addresses ){
    this.addresses .forEach((data,index) =>{
      if(index <  this.addresses .length-3 ) {
         addressDetail = addressDetail + data;
      }
    })
   }
    this.form = this.fb.group({
      eventId: [null],
      province: [
        this.getCodeProvince( this.addresses  ?   this.addresses [ this.addresses .length - 1] : '' ) ,
        [
          Validators.required,
        ],
      ],
      district: [
        '',
        [
          Validators.required,
        ],
      ],
      ward: [
        '',
        [
          Validators.required,
        ],
      ],
      addressDetail: [
        addressDetail,
        [
          Validators.required,
        ],
      ],
      phoneNumber: [
        phoneNumber,
        [
          Validators.required,
          Validators.maxLength(12),
          Validators.pattern( '^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$',)
        ],
      ],
    });
    this.form.get('total')?.setValue(0);
  }

  loadData(id: string): void {
    this.cartService.search(id, true).subscribe((res :any)=>{
      if(res && res.body.data !== null){
        this.carts = res.body?.data?.cartDetailResponseList;
        this.total =0;
        if(this.carts !== null){
        this.carts.forEach((item)=>{
          if(item.price && item.amount) {
            this.total += item.price*item.amount;
            this.chargeShipping(this.total);
          }
        });
        }
        if(this.carts === null){
          this.nodata = true;
        }
      }
    })
  }
  loadEvent(): void {
    this.eventService.getAll().subscribe((res: any) => {
      this.events = res.body?.data?.data;
    });
  }
  getDistrist(provinceID:number){
    const params = {
      province_id:provinceID
    }
    this.countryService.distrist(params).subscribe((res:any) =>{
      this.distrist = res.data;
      this.form.get('district')?.setValue(this.getCodeDistrcit(this.addresses  ?   this.addresses [ this.addresses .length - 2] : '' ))
    })
  }
  getWard(districtId:number){
    this.countryService.ward(districtId).subscribe((res:any) =>{
       this.ward = res.data;
       this.form.get('ward')?.setValue(this.getCodeWard(this.addresses  ?   this.addresses [ this.addresses .length - 3] : '' ))
       this.chargeShipping(this.total)
      })
  }
  getStringWard(){
    const ward = this.form.get('ward')?.value;
    let data2 = '';
    this.ward.forEach((data) => {
      const w= data.WardCode as string;
      if(w === ward){
        data2 =  data.WardName;
      }
    });
    return data2;
  }
  getCodeWard(param:string):string{
    let data2 = '';
    this.ward.forEach((data) => {
      if(data.WardName === param){
        data2 =  data.WardCode;
      }
    });
    return data2;
  }
  getStringDistrcit():string{
    const district = this.form.get('district')?.value;
    let data2 = '';
    this.distrist.forEach((data) => {
      if(data.DistrictID === district){
        data2 =  data.DistrictName;
      }
    });
    return data2;
  }
  getCodeDistrcit(param:string):number{
    let data2 = -1;
    this.distrist.forEach((data) => {
      if(data.DistrictName === param){
        data2 =  data.DistrictID;
      }
    });
    return data2;
  }
  getStringpProvince():string{
    const province = this.form.get('province')?.value;
    let data2 = '';
    this.province.forEach((data) => {
      if(data.ProvinceID === province){
        data2 =  data.ProvinceName;
      }
    });
    return data2;
  }
  getCodeProvince(param:string):number{
    let data2 = -1;
    this.province.forEach((data) => {
      if(data.ProvinceName === param){
        data2 =  data.ProvinceID;
        this.getDistrist(data2);
        const code =  this.getCodeDistrcit(this.form.get("district")?.value);

      }
    });
    return data2;
  }
  chargeShippingWard(){
    this.chargeShipping(this.total);

  }
  intoMoney (price ?: number, amount?: number) :any{
    // @ts-ignore
    return price * amount ;
  }

  addQuantity(cart : ICartDetail): void {
    // @ts-ignore
    if(cart.productSize.quantity === cart.amount){
      this.toast.warning("Số lượng của sản phẩm chỉ còn lại "+cart.amount)
    }else {
    let amount: number =0;
    // @ts-ignore
    amount = cart.amount + 1;
    this.cartService.updateQuantity(cart?.cartDetailId,amount,cart ).subscribe((res: any) =>{
      if (cart?.cartDetailId != null) {
        const userId = this.localStorage.retrieve("profile").userId;
        this.loadData(userId);
        console.log('Tổng tiền'+this.total)
        this.chargeShipping(this.total);

      }
    })
    }
  }

  minusQuantity(cart : ICartDetail): void {
    let amount: number =0;
    // @ts-ignore
    amount = cart.amount - 1;
    this.cartService.updateQuantity(cart?.cartDetailId,amount,cart ).subscribe((res: any) =>{
      if (cart?.cartDetailId != null) {
        const userId = this.localStorage.retrieve("profile").userId;
        this.loadData(userId);
        this.chargeShipping(this.total);
      }
    })

    console.log('Tổng tiền'+this.total)

  }

  showModal(cart: ICartDetail): void {
    this.isVisible = true;
  }

  handleOk(cart: ICartDetail): void {
    this.isOkLoading = true;
    this.cartService.deleteCartDetail(cart.cartDetailId).subscribe((respone: any) =>{
      this.countCart();
      this.toast.success('Xoá thành công sản phẩm khỏi giỏ hàng');
      const userId = this.localStorage.retrieve("profile").userId;
      this.loadData(userId);
      this.chargeShipping(this.total);

    });
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  delete(cart: ICartDetail) :void {
    const deleteForm =CommonUtil.modalConfirm(
      this.translateService,
      'Xoá sản phẩm khỏi giỏ',
      'Bạn có muốn xoá sản phẩm này không',
      //need fix
    )
    const modal: NzModalRef =this.modalService.create(deleteForm);
    modal.afterClose.subscribe((result: {success: boolean; data: any}) =>{
      if(result?.success){
        this.cartService.deleteCartDetail(cart.cartDetailId).subscribe((respone: any) =>{
          this.countCart();
          this.toast.success('Xoá thành công sản phẩm khỏi giỏ hàng');
          const userId = this.localStorage.retrieve("profile").userId;
          this.loadData(userId);
        });
      }
    });
  }

  getTotal(eventId: any) {
    const selectEvent = this.events.filter(
      (evn: IEvent) => evn.eventId === eventId
    );
    this.eventId =eventId;
    this.discount = selectEvent.length > 0 ? selectEvent[0].discount : 0;
    this.thanhtien = this.total - (this.total * this.discount) / 100;
  }

  chargeShipping(total: number) {
    const district = this.form.get('district')?.value as number;
    const ward = this.form.get('ward')?.value;
    const param = {
      shop_id:3445621,
      from_district:2268,
      to_district:district
  }
    this.cartService.getServiceShipping(param).subscribe((res:any)=>{
          const data = res.data;
          this.ship.service_id = data ? data[0].service_id : 53322;
          this.ship.insurance_value=total;
          this.ship.from_district_id =2268;
          this.ship.to_district_id =district as number ;
          this.ship.to_ward_code= ward +'' ;
          this.ship.height=10;
          this.ship.length=10;
          this.ship.weight = 1000;
          this.ship.width =10;
          this.cartService.chargeShipping(this.ship).subscribe((respone) =>{
           this.shipMoney = respone.data.total;
            console.log(this.shipMoney)
         })
    })

  }

  createOrder(): void {
    if(this.total>20000000){
      this.toast.error("Đơn hàng tối đa là 20 triệu vui lòng giảm số lượng")
    }else {
      if (this.pay != null) {
        const MuaHang =CommonUtil.modalConfirm(
          this.translateService,
          'Mua hàng',
          'Bạn có muốn đặt hàng không',
          {name: 'a'}
        )
        const modal: NzModalRef =this.modalService.create(MuaHang);

        modal.afterClose.subscribe((result:{success: boolean; data: any}) =>{
          if(result?.success){
            if (this.pay === PaymentMethod.CARD) {
              console.log(this.shipMoney)
              localStorage.setItem('shipMoney', this.shipMoney);
              localStorage.setItem('eventId',this.form.get('eventId')?.value);
              localStorage.setItem('online', 'online');
              localStorage.setItem('discount',String((this.total * this.discount / 100)));
              localStorage.setItem('address',this.form.get('addressDetail')?.value +", " +this.getStringWard()+", " + this.getStringDistrcit() +", " + this.getStringpProvince(),
              )
              const value = {
                amount: this.total - (this.total * this.discount / 100) + this.shipMoney,
                backcode: 'NCB',
                txt_inv_addr1: 'PHU THO',
                txt_bill_city: 'Thanh Pho Viet Tri',
                txt_inv_mobile: '0387387993',
                txt_inv_country: 'VN',
                txt_inv_email: 'ducd@gmail.com',
                txt_billing_fullname: 'Hoa Don Cua Hang Toan Huyen',
                vnp_OrderInfo: 'VND',
              }
              this.paymentService.payment(value).subscribe((res: any) => {
                window.location.assign(res.body.paymentUrl)
              })
            } else if (this.pay === PaymentMethod.MONEY) {
              this.createOrderPayMoney();
              this.router.navigate([ROUTER_UTILS.payment.root],{ queryParams: {vnp_TransactionStatus:'00'}});
            }
          }
        })
      } else {
        this.toast.error('Hãy chọn phương thức thanh toán')
      }
    }
  }

  calendar(): void {
    const isData = localStorage.getItem('session');
    if(isData == null) {
      const newArr = []
      for(let i = 0 ; i < this.array.length; i++){
        newArr.push(this.array[i])
      }
      localStorage.setItem('session',JSON.stringify(newArr))
    } else {
      const oldArr  = JSON.parse(isData)
      for(let i = 0 ; i < this.array.length; i++){
        oldArr.push(this.array[i])
      }
      localStorage.setItem('session',JSON.stringify(oldArr))
    }
    this.router.navigate([ROUTER_UTILS.book.root]);
  }


  loadCheckbox(event: any, id : ICartDetail) :void {
    if(event.target.checked){
      this.tempArrray = this.carts.filter((e:any) => e.cartDetailId == event.target.value)
      this.array = [];
      this.newArray.push(this.tempArrray)
      for (let i =0 ; i< this.newArray.length ; i++){
        var firstArray = this.newArray[i];
        for( let i = 0 ; i< firstArray.length; i++){
          var obj = firstArray[i];
          this.array.push(obj);
          console.log(this.array)
        }
      }
    } else {
      this.tempArrray = this.array.filter((e:any) => e.cartDetailId != event.target.value)
      this.newArray =[]
      this.array = []
      this.newArray.push(this.tempArrray)
      for (let i =0 ; i< this.newArray.length ; i++){
        var firstArray = this.newArray[i];
        for( let i = 0 ; i< firstArray.length; i++){
          var obj = firstArray[i];
          this.array.push(obj);
        }
      }
    }
  }

  createOrderPayMoney() : void{
    const id = this.localStorage.retrieve("profile").userId;
    const order = {
      customerMoney: 1,
      paymentMethod: PaymentMethod.MONEY,
      transportFee: this.shipMoney,
      purchaseType: OrderType.ONLINE,
      status: StatusEnum.CHO_XAC_NHAN,
      eventId: this.form.get('eventId')?.value,
      address: this.form.get('addressDetail')?.value +", " +this.getStringWard()+", " + this.getStringDistrcit() +", " + this.getStringpProvince(),
      userId: id,
      phoneNumber: this.form.get('phoneNumber')?.value,
      total: this.total - (this.total * this.discount/100) +this.shipMoney ,

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
          this.loadData(id);
        });
    });
  }
  detailPro(cart : any): void {
      this.router.navigate([ROUTER_UTILS.product.root, cart.productId, 'detail']);
  }

  countCart(){
    const userId = this.localStorage.retrieve("profile").userId;
    this.cartService.search(userId, true).subscribe((res :any)=>{
      if(res && res.body.data !== null) {
        console.log(res.body.data);
        this.count = res.body?.data?.cartDetailResponseList.length;
        console.log(this.count)
        this.data.changeMessage(this.count+'');
      }
    })
  }

}

