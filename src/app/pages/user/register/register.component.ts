import { Component, OnInit } from '@angular/core';
import {FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

import {UserService} from "../../../shared/services/user.service";
import {Router, RouterLink} from "@angular/router";
import {CountryService} from "../../../shared/services/country.service";
import {IUser} from "../../../shared/models/user.model";
import {AVATAR_PLACEHOLDER_FILE} from "../../../shared/constants/common.constant";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  file?: File;
  avatarPlaceHolder = AVATAR_PLACEHOLDER_FILE;
  province:any[] = [];
  distrist:any[] = [];
  ward:any[] = [];
  imageUrl?: any;
  idDistrict:number = -1;
  idWard:number = -1;
  addresses:string[] = [];
  isFirst = false;
   checkUser:[] = []
  customer: IUser = {}
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
      addressDetail: ['', [Validators.required]],
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
      this.checkUser = res.body?.data
      this.customer = {
        ...this.validateForm.value,
        imageUrl: this.imageUrl,
        address :this.validateForm.get('addressDetail')?.value +", " +this.getStringWard()+", " + this.getStringDistrcit() +", " + this.getStringpProvince()
      }

      this.userService.create(this.customer).subscribe((value: any) => {
          this.toast.success("Đăng ký thành công")
          this.router.navigate(['/login']);
        }, (error:any) => {
          this.toast.error(error.error.message);
        }
      )
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

  getFiles(files: any): void {
    if (files) {
      this.file = files[0];
      this.getBase64(files[0]).then((data) => {
         this.customer.imageUrl = data as string;
        this.imageUrl = data;
      });
    }
  }

  getBase64(image: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

}
