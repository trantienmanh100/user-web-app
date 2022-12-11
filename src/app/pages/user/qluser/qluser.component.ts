import {Component, OnInit} from '@angular/core';
import {IUser, User} from "../../../shared/models/user.model";
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../../shared/services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-qluser',
  templateUrl: './qluser.component.html',
  styleUrls: ['./qluser.component.scss']
})
export class QluserComponent implements OnInit {

  users = new User();

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
  ) { }

  ngOnInit(): void {
    this.loadData('be2d6163-7979-40fb-a149-dca33bacad1a')
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
    const id = 'be2d6163-7979-40fb-a149-dca33bacad1a'
    this.users.confirmPassword = this.users.password
    this.userService.update(this.users,id).subscribe((res :any)=>{
      this.users = res.body?.data;
      this.toast.success('Update thanh cong');
      console.log(this.users)
      this.loadData(id)
    })
  }
}
