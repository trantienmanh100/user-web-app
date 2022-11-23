import { Category } from './category.model';
import { Material } from './material.model';
import { Accessory } from './accesory.model';
import { Vendor } from './vendor.model';
import { Size, SizeProduct } from './size.model';
import { ProductPropertyValue } from './product-property-value.model';
import { ProductImage } from './product-image.model';


export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export enum ProductGender {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
  FEMALE_AND_MALE = 'FEMALE_AND_MALE'
}

export interface IProduct {
  productId?: string;
  code?: string;
  nameProduct?:string;
  status?:ProductStatus;
  salary?:number;
  note?:string;
  categoryId?:string;
  materialId?:string;
  material?:Material;
  eventId?:string;
  accessoryId?:string;
  category?:Category;
  vendor?:Vendor;
  accessory?:Accessory;
  vendorId?:string,
  gender?:ProductGender;
  createdBy?: string;
  createdAt?: number;
  lastModifiedBy?: string;
  lastModifiedAt?: number;
  imageUrls?:string[];
  productSizes?:SizeProduct[];
  productProperties?:ProductPropertyValue[];
  productImages?:ProductImage[];
  currentImg?: string;
  firstImg?: string;
  secondImg?: string;
}

export class Product implements IProduct {
  constructor(
  public productId?: string,
  public code?: string,
  public nameProduct?:string,
  public status?:ProductStatus,
  public salary?:number,
  public note?:string,
  public categoryId?:string,
  public eventId?:string,
  public category?:Category,
  public materialId?:string,
  public material?:Material,
  public accessoryId?:string,
  public accessory?:Accessory,
  public vendor?:Vendor,
  public  vendorId?:string,
  public gender?:ProductGender,
  public  createdBy?: string,
  public createdAt?: number,
  public lastModifiedBy?: string,
  public lastModifiedAt?: number,
  public imageUrls?:string[],
  public productSizes?:SizeProduct[],
  public productProperties?:ProductPropertyValue[],
  public productImages?:ProductImage[],
  public currentImg?:string,
  public firstImg?:string,
  public secondImg?:string
  ) {
    this.productId = productId;
    this.nameProduct = nameProduct;
    this.code = code;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.lastModifiedAt = lastModifiedAt;
    this.lastModifiedBy = lastModifiedBy;
    this.note = note;
    this.eventId  = eventId;
    this.gender = gender;
    this.status =status;
    this.categoryId = categoryId;
    this.accessoryId = accessoryId;
    this.materialId = materialId;
    this.salary = salary;
    this.vendorId = vendorId,
    this.category = category;
    this.material = material;
    this.accessory = accessory;
    this.vendor = vendor;
    this.imageUrls = imageUrls;
    this.productSizes = productSizes;
    this.productProperties = productProperties;
    this.productImages = productImages;
    this.currentImg =currentImg;
    this.secondImg =secondImg;
    this.firstImg = firstImg;
  }
}
