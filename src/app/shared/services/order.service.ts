import {
  HttpClient,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractService, EntityResponseType
} from "./abstract.service";
import { Observable, of } from 'rxjs';
import {IOrder} from "../models/order.model";
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
    id:string,
    params?: any,
    loading = true,
  ): Observable<EntityResponseType<IOrder>>{
    return super.post<IOrder>(`${this.resourceUrl}/${id}`,params);
  }
  findStatusAndUserId(status: String,
         idUser : string
  ): Observable<EntityResponseType<IOrder[]>> {
    return super.get<ICart>(`${this.resourceUrl}/list?status=${status}&userId=${idUser}`);
  }
  // showChoXacNhan(status:'CHO_XAC_NHAN',
  //                  idUser : string
  // ): Observable<EntityResponseType<IOrder[]>> {
  //   return super.get<ICart>(`${this.resourceUrl}?status=CHO_XAC_NHAN&userId=${idUser}`);
  // }

}
