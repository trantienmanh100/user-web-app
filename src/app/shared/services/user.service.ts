import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { IUser, User } from '../models/user.model';
import {AbstractService, EntityResponseType} from "./abstract.service";

@Injectable({
  providedIn: 'root',
})
export class UserService extends AbstractService {
  public resourceUrl = '/api/v1/user';

  constructor(protected override http: HttpClient) {
    super(http);
  }

  // findAll(loading = false): Observable<EntityResponseType> {
  //   return this.http
  //     .get<IBaseResponse>(`${this.resourceUrl}`, {
  //       observe: 'response', headers: CommonUtil.headers(loading)
  //     });
  // }

  update(
    user: any,
    id: String
  ): Observable<EntityResponseType<IUser>> {
    return super.put<IUser>(`${this.resourceUrl}/${id}/update`, user );
  }

  // delete(id: any, loading = false): Observable<EntityResponseType<Void>> {
  //   return super.delete<Void>(`${this.resourceUrl}/${id}`, user, {loading});
  // }

  find(id: any, loading = false): Observable<EntityResponseType<IUser>> {
    return super.get<IUser>(`${this.resourceUrl}/${id}`, { loading });
  }
  findCustomer( ): Observable<EntityResponseType<IUser[]>> {
    return super.get<IUser[]>(`${this.resourceUrl}/customer`);
  }

  // changePassword(
  //   userId: any,
  //   params: IChangePassword,
  //   loading = true
  // ): Observable<EntityResponseType<IUser>> {
  //   return super.post<IUser>(
  //     `${this.resourceUrl}/${userId}/change-password`,
  //     params,
  //     { loading }
  //   );
  // }

}
