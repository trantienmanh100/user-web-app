import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Cart, ICart} from "../models/cart.model";
import {AbstractService, EntityResponseType} from "./abstract.service";
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

}
