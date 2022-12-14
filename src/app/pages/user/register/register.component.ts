import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {CategoryService} from "../../../shared/services/category.service";
import {CartService} from "../../../shared/services/cart.service";
import {ApoimentService} from "../../../shared/services/apoiment.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  constructor(
    private toast: ToastrService,
    private fb: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(11)]],
      email: ['', [Validators.email,Validators.required]],
      time: ['', [Validators.required]],
      sizeId : ['',[Validators.required]],
      note: ['', [ Validators.required]],
      status: "WAIT_CONFIRM",
    });
  }

  Dangky():void {
    alert('tâ')
  }

}
