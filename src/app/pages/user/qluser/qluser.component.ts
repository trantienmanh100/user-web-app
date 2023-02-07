import {Component, OnInit} from '@angular/core';
import {IUser, User} from "../../../shared/models/user.model";
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../../shared/services/user.service";
import {ToastrService} from "ngx-toastr";
import {LocalStorageService} from "ngx-webstorage";
import CommonUtil from "../../../shared/utils/common-utils";
import {TranslateService} from "@ngx-translate/core";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";

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
    email: [this.users.email,[
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern( '^(\\s){0,}[a-zA-Z][a-zA-Z0-9_\\.\-]{1,50}@[a-zA-Z0-9\-_]{2,}(\\.[a-zA-Z0-9\]{2,4}){1,2}(\\s){0,}$',)
    ]],
    address: [this.users.address, [Validators.required]],
    gender: [this.users.gender],
    phoneNumber: [this.users.phoneNumber,[
      Validators.required,
      Validators.maxLength(12),
      Validators.pattern( '^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$',)
    ]],
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
    private translateService: TranslateService,
    private localStorage : LocalStorageService,
    private modalService: NzModalService
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
    const updateUser =CommonUtil.modalConfirm(
      this.translateService,
      'Cập nhật thông tin',
      'Bạn có muốn cập nhập không',
      {name: 'a'}
    )
    const modal: NzModalRef =this.modalService.create(updateUser);
    modal.afterClose.subscribe((result:{success: boolean; data: any}) =>{
      if(result?.success){
        const id = this.userId
        this.users.confirmPassword = this.users.password
        this.userService.update(this.users,id).subscribe((res :any)=>{
          this.users = res.body?.data;
          this.toast.success('Cập nhật thông tin thành công');
          console.log(this.users)
          this.loadData(id)
        }, (error:any) => {
          this.toast.error(error.error.message)
        })
      }
      })
  }
}
