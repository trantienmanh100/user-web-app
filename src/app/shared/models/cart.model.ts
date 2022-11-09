import {ICartDetail} from "./cart-detail.model";

export interface ICart {
  cartId?: string;
  userId?: string;
  cartDetailResponseList?: ICartDetail[];
}
export class Cart implements ICart {
  constructor(
    public cartId?: string,
    public amount?: number,
    public cartDetailResponseList ?: ICartDetail[],
  ) {
    this.cartId = cartId;
    this.amount = amount;
    this.cartDetailResponseList =cartDetailResponseList;
  }
}
