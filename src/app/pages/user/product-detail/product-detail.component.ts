import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {IProduct} from "../../../shared/models/product.model";
import {ActivatedRoute} from "@angular/router";
import {ISize} from "../../../shared/models/size.model";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  imageUrl?: any;
  productId = '';
  sizes : ISize[] =[];
  productDetail : IProduct = {}
  form: FormGroup = new FormGroup({});
  constructor(
    private productService : ProductService,
    private router: ActivatedRoute,
  ) {
    this.router.paramMap.subscribe((res) => {
      this.productId = res.get('id') || '';
    });
  }

  ngOnInit(): void {
    this.loadData(this.productId);
  }

  loadData(id :string): void {
    this.productService.detail(id).subscribe((respone: any)=> {
      this.productDetail =respone.body?.data;
      // @ts-ignore
      this.imageUrl = this.productDetail.productImages[0].imageUrl;
      // @ts-ignore
      this.sizes = this.productDetail?.productSizes;
      console.log(this.sizes)
    })
  }

}
