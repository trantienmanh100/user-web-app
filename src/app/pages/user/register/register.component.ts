import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {CategoryService} from "../../../shared/services/category.service";
import {CartService} from "../../../shared/services/cart.service";
import {ApoimentService} from "../../../shared/services/apoiment.service";
import {UserService} from "../../../shared/services/user.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  constructor(
    private toast: ToastrService,
    private userService : UserService,
    private fb: UntypedFormBuilder,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required]],
      fullName : ['',[Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(11)]],
      email: ['', [ Validators.required]],
      gender: ['', [ Validators.required]],
      birthday: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      role: "CUSTOMER",
      cccd: [' '],
      address: ['', [ Validators.required]],
    });
  }

  Dangky():void {
    this.userService.findCustomer().subscribe((res: any) => {
      const checkUser:[] = res.body?.data
      if(checkUser.length == 0) {
        if (this.validateForm.value.password === this.validateForm.value.confirmPassword) {
          this.userService.create(this.validateForm.value).subscribe((res: any) => {
              this.toast.success("Đăng ký thành công")
              this.router.navigate(['/login']);
            },
          )
        } else {
          this.toast.error("'Mật khẩu không khớp")
        }
      } else {
        checkUser.map((res:any) => {
          if(res.userName == this.validateForm.value.userName.trim()) {
            this.toast.error("Tên đăng nhập đã tồn tại")
            return;
          } else if ( res.phoneNumber == this.validateForm.value.phoneNumber.trim()){
            this.toast.error("Số điện thoại đã tồn tại")
            return;
          } else if (res.email == this.validateForm.value.email.trim()){
            this.toast.error("Email đã tồn tại")
            return;
          }  else if (this.validateForm.value.password === this.validateForm.value.confirmPassword) {
            this.userService.create(this.validateForm.value).subscribe((res: any) => {
                this.toast.success("Đăng ký thành công")
                this.router.navigate(['/login']);
              },
            )
          } else {
            this.toast.error('Mật khẩu không khớp')
          }
        })
      }

    })
  }
}
