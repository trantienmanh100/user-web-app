import {Component, Input, OnInit} from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import {ICartDetail} from "../../../../shared/models/cart-detail.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  listProduct :ICartDetail[] = []
  constructor(
    private fb: UntypedFormBuilder,
    private router: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    const cartProduct:any  = localStorage.getItem('session');
    this.listProduct = JSON.parse(cartProduct);
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(11)]],
      email: ['', [Validators.email,Validators.required]],
      time: ['', [Validators.required]],
      note: ['', [ Validators.required]],
    });
  }

  submitForm(): void {
    console.log(this.validateForm.value)
  }

  delete(id: any) {
    const isData = localStorage.getItem('session')
    if(isData != null) {
      console.log(id)
      const local =JSON.parse(isData)
      for (let i = 0 ; i< local.length; i++){
        if(local[i].cartDetailId == id) {
          local.splice(0,1)
        }
      }
      localStorage.setItem("session", JSON.stringify(local))
      this.loadLocalStorage()
    }
  }

  loadLocalStorage(){
    const isData = localStorage.getItem('session')
    if(isData != null) {
      const localData = JSON.parse(isData);
      this.listProduct=  localData
    }
  }



}
