
export interface ICartDetail {
  cartDetailId?: string;
  productName?: number;
  image?: string;
  sizeId?: string;
  productId?: string;
  sizeName?: string;
  amount?: number;
  price?: number;
  code?: string;
}
export class CartDetail implements ICartDetail {
  constructor(
    public cartDetailId?: string,
    public productId ?: string,
    public cartId?: string,
    public userId?: string,
    public sizeId?: string,
    public amount?: number,
    public code?: string,
  ) {
    this.cartDetailId = cartDetailId;
    this.amount = amount;
    this.productId = productId;
    this.cartId = cartId;
    this.userId =userId;
    this.sizeId =sizeId;
    this.amount =amount;
    this.code =code;
  }
}
