// import {Customer} from './customer.model';
// import {Role} from './role.model';
// import {UserPrimary} from './user-primary.model';

import {UserPrimary} from "./user-primary.model";
import {Role} from "./role.model";
import {Customer} from "./customer.model";

export interface IUser {
  userId?: string,
  userName?: string,
  fullName?: string,
  birthday?: string,
  password?: string,
  confirmPassword? : string,
  gender?: string,
  role?: string,
  phoneNumber? : string,
  cccd?: string,
  email?: string,
  address?: string,
  imageUrl?: string,
  note?: string,
}

export class User implements IUser {
  constructor(
    public userId?: string,
    public userName?: string,
    public fullName?: string,
    public birthday?: string,
    public password?: string,
    public confirmPassword? : string,
    public gender?: string,
    public role?: string,
    public phoneNumber? : string,
    public cccd?: string,
    public email?: string,
    public address?: string,
    public imageUrl?: string,
    public note?: string,
  ) {
    this.userId = userId;
    this.userName = userName;
    this.fullName = fullName;
    this.birthday = birthday;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.gender = gender;
    this.role = role;
    this.phoneNumber = phoneNumber;
    this.cccd = cccd;
    this.email = email;
    this.address = address;
    this.imageUrl = imageUrl;
    this.note = note;

  }
}
