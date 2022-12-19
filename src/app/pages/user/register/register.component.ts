import { Component, OnInit } from '@angular/core';
import {FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

import {UserService} from "../../../shared/services/user.service";
import {Router, RouterLink} from "@angular/router";
import {CountryService} from "../../../shared/services/country.service";
import {IUser} from "../../../shared/models/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  province:any[] = [];
  distrist:any[] = [];
  ward:any[] = [];
  idDistrict:number = -1;
  idWard:number = -1;
  addresses:string[] = [];
  isFirst = false;

constructor(
    private toast: ToastrService,
    private userService : UserService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private countryService : CountryService

  ) { }

  ngOnInit(): void {
    this.countryService.province().subscribe((res:any)=>{
      this.province = res.data;
    })
    let addressDetail = '';

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
      addressDetail: [
        addressDetail,
        [
          Validators.required,
        ],
      ],
      province: [
        this.getCodeProvince( this.addresses  ?   this.addresses [ this.addresses .length - 1] : '' ) ,
        [
          Validators.required,
        ],
      ],
      district: [
        '',
        [
          Validators.required,
        ],
      ],
      ward: [
        '',
        [
          Validators.required,
        ],
      ],
    });
  }


  Dangky():void {
    this.userService.findCustomer().subscribe((res: any) => {
      const checkUser:[] = res.body?.data
      const customer: IUser = {
        ...this.validateForm.value,
        address :this.validateForm.get('addressDetail')?.value +", " +this.getStringWard()+", " + this.getStringDistrcit() +", " + this.getStringpProvince()
      }
      if(checkUser.length == 0) {
        if (customer.password === customer.confirmPassword) {
          this.userService.create(customer).subscribe((res: any) => {
              this.toast.success("Đăng ký thành công")
              this.router.navigate(['/login']);
            },
          )
        } else {
          this.toast.error("'Mật khẩu không khớp")
        }
      } else {
        checkUser.map((res:any) => {
          if(res.userName == customer.userName) {
            this.toast.error("Tên đăng nhập đã tồn tại")
            return;
          } else if ( res.phoneNumber == customer.phoneNumber){
            this.toast.error("Số điện thoại đã tồn tại")
            return;
          } else if (res.email == customer.email){
            this.toast.error("Email đã tồn tại")
            return;
          }  else if (customer.password === customer.confirmPassword) {
            this.userService.create(customer).subscribe((res: any) => {
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

  getDistrist(provinceID:number){
    const params = {
      province_id:provinceID
    }
    this.countryService.distrist(params).subscribe((res:any) =>{
      this.distrist = res.data;
    })
  }


  getCodeProvince(param:string):number{
    let data2 = -1;
    this.province.forEach((data) => {
      if(data.ProvinceName === param){
        data2 =  data.ProvinceID;
        this.getDistrist(data2);

      }
    });
    return data2;
  }


  getStringpProvince():string{
    const province = this.validateForm.get('province')?.value;
    let data2 = '';
    this.province.forEach((data) => {
      if(data.ProvinceID === province){
        data2 =  data.ProvinceName;
      }
    });
    return data2;
  }


  getWard(districtId:number){
    this.countryService.ward(districtId).subscribe((res:any) =>{
      this.ward = res.data;
      this.validateForm.get('ward')?.setValue(this.getCodeWard(this.addresses  ?   this.addresses [ this.addresses .length - 3] : '' ))

    })
  }
  getStringWard(){
    const ward = this.validateForm.get('ward')?.value;
    let data2 = '';
    this.ward.forEach((data) => {
      const w= data.WardCode as string;
      if(w === ward){
        data2 =  data.WardName;
      }
    });
    return data2;
  }
  getCodeWard(param:string):string{
    let data2 = '';
    this.ward.forEach((data) => {

      if(data.WardName === param){
        data2 =  data.WardCode;
      }
    });
    return data2;
  }
  getStringDistrcit():string{
    const district = this.validateForm.get('district')?.value;
    let data2 = '';
    this.distrist.forEach((data) => {
      if(data.DistrictID === district){
        data2 =  data.DistrictName;
      }
    });
    return data2;
  }

}
