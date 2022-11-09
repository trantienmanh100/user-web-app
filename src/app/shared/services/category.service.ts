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
export class CategoryService extends AbstractService {
  public resourceUrl = '/api/v1/category';
  // @ts-ignore
  constructor(protected http: HttpClient) {
    super(http);
  }

  searchCategoriesAutoComplete(
    params?: any,
    loading = false
  ): Observable<EntityResponseType<ICategory[]>> {
    return super.get<ICategory[]>(`${this.resourceUrl}/auto-complete`, {
      params,
      loading,
    });
  }

  search(
    params?: ICategorySearchRequest,
    loading = true
  ): Observable<EntityResponseType<ICategory[]>> {
    return super.get<ICategory[]>(`${this.resourceUrl}`,{params});
  }

  findByCategoryId(
    id: string,
    loading = false
  ): Observable<EntityResponseType<ICategory>> {
    return super.get<ICategory>(`${this.resourceUrl}/${id}`, { loading });
  }
  getProperties(
    id: string,
    loading = false
  ): Observable<EntityResponseType<ICategoryProperty[]>> {
    return super.get<ICategoryProperty[]>(
      `${this.resourceUrl}/${id}/properties`,
      { loading }
    );
  }
  getPropertiesByCategoryIds(
    id: string
  ): Observable<EntityResponseType<ICategoryProperty>> {
    return super.get<ICategoryProperty>(
      `${this.resourceUrl}/${id}/properties`,
    );
  }

  inactiveCategory(
    id: string,
    loading = false
  ): Observable<EntityResponseType<ICategory>> {
    return super.post<ICategory>(
      `${this.resourceUrl}/${id}/inactive`,
      {},
      { loading }
    );
  }

}
