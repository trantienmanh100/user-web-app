import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormsModule} from "@angular/forms";
import {UserService} from "../../../../shared/services/user.service";
import {ToastrService} from "ngx-toastr";
import {IUser, User} from "../../../../shared/models/user.model";

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnInit {
  users = new User();

  changeForm = this.fb.group({
    oldPass : '',
    password: '',
    confirmPassword: '',
  })
  constructor(
    private fb : FormBuilder,
    private userService : UserService,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.loadData('be2d6163-7979-40fb-a149-dca33bacad1a')
  }

  loadData (id : String) {
    this.userService.find(id,true).subscribe((res:any) => {
      this.users = res.body?.data;
    })
  }

  changePass(){
    const id = 'be2d6163-7979-40fb-a149-dca33bacad1a'
    const user: any  = {
      userName : this.users.userName,
      fullName: this.users.fullName,
      birthday: this.users.birthday,
      password: this.changeForm.value.password,
      confirmPassword: this.changeForm.value.confirmPassword,
      gender: this.users.gender,
      role : this.users.role,
      phoneNumber: this.users.phoneNumber,
      cccd : this.users.cccd,
      email: this.users.email,
      address: this.users.address,
      imageUrl: this.users.imageUrl,
      note: this.users.note,
    }

    if( this.users.password === this.changeForm.get('oldPass')?.value) {
      if( this.changeForm.value.password === this.changeForm.value.confirmPassword) {
        this.userService.update(user,id).subscribe((res :any)=>{
          this.toast.success('Update thanh cong');
          this.changeForm.reset()
          console.log(user)

        })
      } else {
        this.toast.error('Mật khẩu không khớp');
        return;
      }
    } else {
      this.toast.error('Mật khẩu cũ sai');
      return;
    }

  }
}
