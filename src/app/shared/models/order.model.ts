import {TransferItem} from "ng-zorro-antd/transfer";
import { User } from "./user.model";
export enum PaymentMethod {
  MONEY="MONEY",
  CARD = "CARD",
}
export enum StatusEnum {
  CHO_XAC_NHAN = "CHO_XAC_NHAN",
  XAC_NHAN = "XAC_NHAN",
  DANG_GIAO = "DANG_GIAO",
  DA_GIAO = "DA_GIAO",
  HUY = "HUY"
}
export enum OrderType {
  DIRECT_TYPE = "DIRECT_TYPE",
   ONLINE = "ONLINE"
}
export interface IOrder {
  createBy?: string;
  createAt?: number;
  lastModifiedBy?: string;
  lastModifiedAt?: number;
  id?: string;
  orderCode?: number;
  customerMoney?: number;
  paymentMethod?: PaymentMethod;
  transportFee?:number;
  total?: number;
  purchaseType?:OrderType;
  status?: StatusEnum;
  eventId?:string;
  address?:string;
  userId?:string;
  event?:Event;
  orderDetailDTOList?:IProductOrder[];
  isRepurchase?:boolean;
  cost?:number;
  note?:string;
  phoneNumber?:string;
  discount?:number;
}

export class Order implements IOrder {
  constructor(
    public createBy?: string,
    public createAt?: number,
    public lastModifiedBy?: string,
    public lastModifiedAt?: number,
    public id?: string,
    public orderCode?: number,
    public customerMoney?: number,
    public paymentMethod?: PaymentMethod,
    public transportFee?:number,
    public total?: number,
    public purchaseType?:OrderType,
    public status?: StatusEnum,
    public eventId?:string,
    public address?:string,
    public userId?:string,
    public user?:User,
    public event?:Event,
    public  orderDetailDTOList?:IProductOrder[],
    public isRepurchase?:boolean,
    public cost?:number,
    public note?:string,
    public phoneNumber?:string,
    public discount?: number,
    ){
    this.createAt = createAt;
    this.createBy = createBy;
    this.customerMoney = customerMoney;
    this.eventId = eventId;
    this.lastModifiedAt = lastModifiedAt;
    this.lastModifiedBy = lastModifiedBy;
    this.orderCode = orderCode;
    this.id = id;
    this.paymentMethod  = paymentMethod;
    this.purchaseType = purchaseType;
    this.status = status;
    this.total =total;
    this.transportFee = transportFee;
    this.address  = address;
    this.user = user;
    this.event = event;
    this.orderDetailDTOList = orderDetailDTOList;
    this.userId = userId;
    this.isRepurchase = isRepurchase;
    this.cost = cost;
    this.note = note;
    this.phoneNumber = phoneNumber;
    this.discount =discount;
    }
}

export interface IOrderRequest {
  createdUserId?: string;
  menuId?: string;
  type?: string;
  purchaseOrderItems?: [
    {
      productId?: string;
      quantity?: number;
    }
  ]
}

export interface IOrderItem {
  id?: string;
  orderId?: string;
  productId?: string;
  createdBy?: string;
  createdAt?: number;
  lastModifiedBy?: number;
  lastModifiedAt?: number;
  purchaseOrderId?: string;
  productName?: string;
  productPrice?: number;
  quantity?: number;
  deleted?: boolean;
}

export class OrderItem implements IOrderItem {
  constructor(
    public id?: string,
    public orderId?: string,
    public productId?: string,
    public quantity?: number,
  ) {
    this.id = id;
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
  }
}

export interface IPurchaseOrderHistory {
  createdBy?: string;
  createdAt?: number;
  lastModifiedBy?: string;
  lastModifiedAt?: number;
  id?: string;
  createdUserId?: string;
  createdUserFullName?: string;
  purchaseOrderId?: string;
  status?: string;
  deleted?: boolean;
}
export interface IProductOrder {
   id?:string,
   productId?:String,
   imageUrl?:string[],
   price?:number,
   pricePurchase?:number,
   nameProduct?:string,
   quantity?:number,
   size?:string,
   sizeId?:string,
   quantityBy?:number,
   total?:number
}
export class ProductOrder implements IProductOrder   {
 constructor(public id?:string,
  public productId?:String,
  public imageUrl?:string[],
  public price?:number,
  public pricePurchase?:number,
  public nameProduct?:string,
  public quantity?:number,
  public size?:string,
  public sizeId?:string,
  public quantityBy?:number,
  public total?:number ){
    this.id = id;
    this.productId = productId;
    this.imageUrl = imageUrl;
    this.price = price;
    this.pricePurchase = pricePurchase;
    this.nameProduct = nameProduct;
    this.quantity  = quantity;
    this.quantityBy = quantityBy;
    this.size = size;
    this.sizeId  = sizeId,
    this.total = total
  }

}
export interface ChangeOrderStatusRequest {
  purchaseOrderIds?: string[];
}

export interface ProductItem extends TransferItem {
  data: IProductOrder,
}
export interface IExchangeProduct extends IProductOrder{
  selected?:boolean
}
export class ExchangeProduct implements IExchangeProduct{
    constructor(public productOrder?:IProductOrder,
                public quantityExchange?:number,
                public selected?:boolean){
                  this.selected  = selected;
                  this.productOrder = productOrder;
                  this.quantityExchange = quantityExchange;
                }
}
export class ExchangeDetail {
  constructor(public productId?:string,
               public sizeId?:string,
              public quantity?:number){
                this.productId = productId;
                this.quantity = quantity;
                this.sizeId = sizeId;
              }
}

export const DEFAULT_QUANTITY = 1;

export const PurchaseForm = [
  { key: 'SOLD_OUT', value: 'Bán ra' },
  { key: 'BUY_INTO', value: 'mua vào' },
]

