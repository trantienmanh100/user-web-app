import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Cart, ICart} from "../models/cart.model";
import {AbstractService, EntityResponseType} from "./abstract.service";
import CommonUtil from "../utils/common-utils";
import {Ship} from "../models/ship.model";
@Injectable({
  providedIn: 'root',
})
export class CartService extends AbstractService {
  public resourceUrl = '/api/v1/cart';
  // @ts-ignore
  constructor(protected http: HttpClient) {
    super(http);
  }
  addToCart(cart: Cart): Observable<EntityResponseType<ICart>>{
    return super.post<ICart>(`${this.resourceUrl}`, cart);
  }
  search(id:string,
    loading = false
  ): Observable<EntityResponseType<ICart[]>> {
    return super.get<ICart>(`${this.resourceUrl}/${id}`,{ loading});
  }

  updateQuantity(id: any, amount: number, cart : ICart): Observable<EntityResponseType<ICart>> {
    return super.put<ICart>(`${this.resourceUrl}/${id}?amount=${amount}`, {cart});
  }

  deleteCartDetail(id:any): Observable<EntityResponseType<ICart>>{
    return super.delete<ICart>(`${this.resourceUrl}/${id}`);
  }

  deleteCart(userId:any): Observable<EntityResponseType<ICart>>{
    return super.delete<ICart>(`${this.resourceUrl}/delete/${userId}`);
  }

  chargeShipping(ship : Ship ) :Observable<any> {
    return this.http.post('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', ship,
      { headers: new HttpHeaders().set('Token','47c4a6b7-6337-11ed-b824-262f869eb1a7'),
  })
  }

}
