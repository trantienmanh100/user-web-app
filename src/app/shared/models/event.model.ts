
export interface IEvent {
  eventId: string,
  code:string,
  name: string,
  discount: number,
  startDate: Date | string,
  endDate: Date | string,
  description: string,
  createAt: number,
  createBy: string,
  lastModifiedAt: number,
  lastModifiedBy: string,
  deleted: boolean
}
export class Event implements IEvent {
  constructor(
    public eventId: string,
    public code:string,
    public name: string,
    public discount: number,
    public  startDate: Date | string,
    public  endDate: Date | string,
    public description: string,
    public createAt: number,
    public  createBy: string,
    public  lastModifiedAt: number,
    public lastModifiedBy: string,
    public  deleted: boolean,
  ) {
    this.eventId = eventId;
    this.code = code;
    this.name = name;
    this.discount = discount;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
    this.deleted =deleted;
    this.createAt = createAt;
    this.createBy = createBy;
    this.lastModifiedAt = lastModifiedAt;
    this.lastModifiedBy = lastModifiedBy;
  }
}
