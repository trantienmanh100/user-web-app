import {
  HttpClient,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractService, EntityResponseType
} from "./abstract.service";
import { Observable, of } from 'rxjs';
import {IOrder, Order} from "../models/order.model";
import {ICart} from "../models/cart.model";
@Injectable({
  providedIn: 'root',
})
export class OrderService extends AbstractService {
  public resourceUrl = "/api/v1/order";
  constructor(protected override http: HttpClient) {
    super(http);
  }
  findOne(
    id:string,
    loading = true,
  ): Observable<EntityResponseType<IOrder> >{
    return super.get<IOrder>(`${this.resourceUrl}/${id}`,{loading:true});
  }
  createOrder(
    params?: any,
    loading = true,
  ): Observable<EntityResponseType<IOrder>>{
    return super.post<IOrder>(`${this.resourceUrl}`,params);
  }
  updateOrder(
    id: String,
    params?: any,
  ): Observable<EntityResponseType<IOrder>>{
    return super.post<IOrder>(`${this.resourceUrl}/${id}`,params);
  }
  showByBought(status: string,
         idUser : string
  ): Observable<EntityResponseType<Order[]>> {
    console.log(status)
    return super.get<ICart>(`${this.resourceUrl}/list?status=${status}&userId=${idUser}`);
  }
}
