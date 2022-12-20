
export interface IProductSearchRequest {
  vendorId?: string;
  startPrice?: number;
  endPrice?: number;
  pageIndex?: any;
  pageSize?: any;
  sortBy?: string;
  keyword?: string;
  categoryId?: string;
  accessoryId?: string[];
  materialId?: string;
  status?: ProductStatus;
  gender?: ProductGender;
}

export class ProductSearchRequest implements IProductSearchRequest {
  constructor(
    public  vendorId?: string,
    public startPrice?: number,
    public  endPrice?: number,
    public pageIndex?: any,
    public  pageSize?: any,
    public sortBy?: string,
    public  keyword?: string,
    public  categoryId?: string,
    public accessoryId?: string[],
    public  materialId?: string,
    public status?: ProductStatus,
    public gender?: ProductGender,
  ) {
    this.startPrice = startPrice;
    this.endPrice = endPrice;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.sortBy = sortBy;
    this.keyword = keyword;
    this.categoryId = categoryId;
    this.materialId = materialId;
    this.status = status;
    this.accessoryId = accessoryId;
    this.vendorId = vendorId;
    this.gender = gender;
  }
}

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export enum ProductGender {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
  FEMALE_AND_MALE = 'FEMALE_AND_MALE'
}
