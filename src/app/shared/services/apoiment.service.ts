import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Cart, ICart} from "../models/cart.model";
import {AbstractService, EntityResponseType} from "./abstract.service";
import {IApoiment} from "../models/apoiment.model";
@Injectable({
  providedIn: 'root',
})
export class ApoimentService extends AbstractService {
  public resourceUrl = '/api/v1/calendar';
  // @ts-ignore
  constructor(protected http: HttpClient) {
    super(http);
  }
  addToCalendar(apoiment: IApoiment): Observable<EntityResponseType<IApoiment>>{
    return super.post<IApoiment>(`${this.resourceUrl}`, apoiment);
  }


}
