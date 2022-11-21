import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Category, ICategory} from "../models/category.model";
import {ICategorySearchRequest} from "../models/request/category-search-request.model";
import {ICategoryProperty} from "../models/product-category-property.model";
import {AbstractService, EntityResponseType} from "./abstract.service";
@Injectable({
  providedIn: 'root',
})
export class PaymentService extends AbstractService {
  public resourceUrl = '/test-vnpay';

  // @ts-ignore
  constructor(protected http: HttpClient) {
    super(http);
  }

  payment(
    params?: any,
  ): Observable<EntityResponseType<any>> {
    return super.get<EntityResponseType<any>>(
      `${this.resourceUrl}`,{params});
  }

}
