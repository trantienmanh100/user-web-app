import {
  HttpClient,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import {AbstractService, EntityResponseType} from "./abstract.service";
import {ISize} from "../models/size.model";
@Injectable({
  providedIn: 'root',
})
export class SizeService extends AbstractService {
  public resourceUrl = "/api/v1/size";
  // @ts-ignore
  constructor(protected http: HttpClient) {
    super(http);
  }
  autoComplete(
    loading = true
  ): Observable<EntityResponseType<ISize[]> >{
    return super.get<ISize[]>(`${this.resourceUrl}`);
  }

}
