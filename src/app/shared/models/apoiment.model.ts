export enum StatusEnum {
  WAIT_CONFIRM = "WAIT_CONFIRM" ,
  ACTIVE = "ACTIVE",
  DONE = "DONE",
  CLOSE = "CLOSE",
}
export interface IApoiment {
  userName?: string;
  phoneNumber?: string;
  email?: string;
  time: Date | string;
  productId?: string;
  sizeId?: string;
  note ?: string;
  status? : StatusEnum;
}
export class apoiment implements IApoiment {
  constructor(
  public  userName: string,
  public  phoneNumber: string,
  public  email: string,
  public  time: Date | string,
  public  productId: string,
  public  sizeId: string,
  public  note : string,
  public  status: StatusEnum,

  ) {
    this.userName = userName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.time = time;
    this.productId = productId;
    this.sizeId = sizeId;
    this.note = note;
    this.status = status;
  }
}
