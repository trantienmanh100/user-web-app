import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../shared/services/user.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: UntypedFormGroup;
  isVisible = false;

  constructor(private fb:FormBuilder,
    private authService:AuthService,
    private $localstorage:LocalStorageService,
    private toast:ToastrService,
    private userService:UserService) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
        ],
      ],
      password: ['', [Validators.required]],
      rememberMe: [true],
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  get f() {
    return this.loginForm.controls;
  }
  submitForm(): void {
    if (this.loginForm.valid) {
      this.authService
        .login(
          this.f['userName'].value,
          this.f['password'].value,
          this.f['rememberMe'].value
        )
        .subscribe((token:any) => {
         this.$localstorage.store("jwt-token",token.data.token);
         this.$localstorage.store("userName",token.data.username)
         this.$localstorage.store("role",token.data.roles);
         const role = this.$localstorage.retrieve('role');
         console.log(role);
         const data ={
          userName:token.data.username
         }
         this.userService.findByUserName(data).subscribe((res:any) => {
          this.$localstorage.store("profile",res.body.data);
          console.log(this.$localstorage.retrieve('profile'));

          this.toast.success("Đăng nhập thành công");
          window.location.assign("http://localhost:9990/")
         })
         if(token.data.roles.length > 0){
         const isAdmin = token.data.roles[0].role === 'MANAGER' ? true :false;
         this.$localstorage.store("isAdmin",isAdmin+'');
           console.log(localStorage.getItem('isadmin'));
         }
        },(error:any) =>{
          this.toast.error(error.error.message);
        });
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
