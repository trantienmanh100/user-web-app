import {
  HttpClient,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {IAccessory} from "../models/accesory.model";
import {AccessorySearchRequest} from "../models/request/accessory-search-request.model";
import {AbstractService, EntityResponseType} from "./abstract.service";

@Injectable({
  providedIn: 'root',
})
export class AccessoryService extends AbstractService {
  public resourceUrl = "/api/v1/accessory";
  // @ts-ignore
  constructor(protected http: HttpClient) {
    super(http);
  }
  autoComplete(
    params?:AccessorySearchRequest,
    loading = false
  ): Observable<EntityResponseType<IAccessory[]>> {
    return super.get<IAccessory[]>(`${this.resourceUrl}/auto-complete`,{params});
  }
  search(
    params?: AccessorySearchRequest,
    loading = true
  ): Observable<EntityResponseType<IAccessory[]> >{
    return super.get<IAccessory[]>(`${this.resourceUrl}`,{params,loading:true});
  }


}
