
export interface IBaseResponse<T> {
  success?: boolean;
  code?: number | string;
  data?: T;
  message?: string;
  page?: IPageable;
  timestamp?: string | number | any;
}

export interface IPageable {
  pageIndex?: number;
  pageSize?: number;
  total?: number;
  hasPageable?: boolean;
}

