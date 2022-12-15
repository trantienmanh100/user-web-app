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
      confirmPassword: ['', [Validators.email,Validators.required]],
      role: "CUSTOMER",
      cccd: " ",
      address: ['', [ Validators.required]],

    });
  }

  Dangky():void {
    if(this.validateForm.value.password === this.validateForm.value.confirmPassword) {
      this.userService.create(this.validateForm.value).subscribe((res: any) => {
          this.toast.success("Đăng ký thành công")
          this.router.navigate(['/login']);
        },
        (error: any)=> {
          this.toast.error(error)
        })
    } else  {
      this.toast.error('Mật khẩu không khớp')
    }
  }
}
