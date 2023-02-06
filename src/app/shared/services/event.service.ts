import {
  HttpClient,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {AbstractService, EntityResponseType} from "./abstract.service";
import {ISize} from "../models/size.model";
import {IEventSearchRequest} from "../models/request/event-search-request.model";
import {IEvent} from "../models/event.model";
@Injectable({
  providedIn: 'root',
})
export class EventService extends AbstractService {
  public resourceUrl = "/api/v1/event";
  // @ts-ignore
  constructor(protected http: HttpClient) {
    super(http);
  }
  getAll(
    loading = true
  ): Observable<EntityResponseType<ISize[]> >{
    return super.get<ISize[]>(`${this.resourceUrl}`);
  }
  search(params?:IEventSearchRequest):Observable<EntityResponseType<IEvent[]> >{
    return super.get<IEvent[]>(`${this.resourceUrl}`,{params});
  }


}
