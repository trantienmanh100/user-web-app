import {Component, OnInit} from '@angular/core';
import {IUser, User} from "../../../shared/models/user.model";
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../../shared/services/user.service";
import {ToastrService} from "ngx-toastr";
import {LocalStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-qluser',
  templateUrl: './qluser.component.html',
  styleUrls: ['./qluser.component.scss']
})
export class QLUserComponent implements OnInit {

  users = new User();
  userId = this.localStorage.retrieve("profile").userId;
  // users : IUser={}
  userForm = this.fb.group({
    fullName: [this.users.fullName,[Validators.required]],
    userName : this.users.userName,
    email: [this.users.email,[Validators.required, Validators.email]],
    address: [this.users.address, [Validators.required]],
    gender: 'MALE',
    phoneNumber: [this.users.phoneNumber,[Validators.required]],
    birthday: [this.users.birthday,[Validators.required]],
    password: this.users.password,
    confirmPassword: this.users.confirmPassword,
    imageUrl: this.users.imageUrl,
    note: this.users.note
  })
  constructor(
    private fb: FormBuilder,
    private userService : UserService,
    private toast: ToastrService,
    private localStorage : LocalStorageService
  ) { }

  ngOnInit(): void {
    this.loadData(this.userId)
  }

  get f () {
    return this.userForm.controls
  }

  loadData (id : String) {
    this.userService.find(id,true).subscribe((res:any) => {
      this.users = res.body?.data;
    })
  }

  updateUser()  {
    const id = this.userId
    this.users.confirmPassword = this.users.password
    this.userService.update(this.users,id).subscribe((res :any)=>{
      this.users = res.body?.data;
      this.toast.success('Cập nhật thông tin thành công');
      console.log(this.users)
      this.loadData(id)
    })
  }
}
