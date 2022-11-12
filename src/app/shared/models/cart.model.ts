import {ICartDetail} from "./cart-detail.model";

export interface ICart {
  cartId?: string;
  userId?: string;
  cartDetailResponseList?: ICartDetail[];
  productId?: string;
  sizeId?: string;
  amount ?: number;
}
export class Cart implements ICart {
  constructor(
    public cartId?: string,
    public amount?: number,
    public productId?:string,
    public sizeId?: string,
    public userId?: string,
    public cartDetailResponseList ?: ICartDetail[],
  ) {
    this.cartId = cartId;
    this.amount = amount;
    this.cartDetailResponseList =cartDetailResponseList;
    this.productId = productId;
    this.sizeId =sizeId;
    this.userId = userId;
  }
}
