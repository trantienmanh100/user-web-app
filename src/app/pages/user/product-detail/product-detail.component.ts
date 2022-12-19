import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {IProduct} from "../../../shared/models/product.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ISize, ISizeProduct} from "../../../shared/models/size.model";
import {FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Cart} from "../../../shared/models/cart.model";
import {CartService} from "../../../shared/services/cart.service";
import {Category} from "../../../shared/models/category.model";
import {CategoryService} from "../../../shared/services/category.service";
import {ApoimentService} from "../../../shared/services/apoiment.service";
import {IProductSearchRequest} from "../../../shared/models/request/product-search-request.model";
import {PAGINATION} from "../../../shared/constants/pagination.constants";
import {ROUTER_UTILS} from "../../../shared/utils/router.utils";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  isChosseRadio =false;
  isChosseRadio2 =false;
  lengthSize =0;
  size : ISizeProduct ={};
  salePrice =[];
  imageUrl?: any;
  categories : Category[]=[];
  productId = '';
  sizes : ISizeProduct[] =[];
  productDetail : IProduct = {}
  totalQuantity =0;
  form: FormGroup = new FormGroup({});
  input_quantity= 1;
  validateForm!: UntypedFormGroup;
  productSearchRequest: IProductSearchRequest = {
    pageIndex: PAGINATION.PAGE_DEFAULT,
    pageSize: PAGINATION.SIZE_DEFAULT,
  };

  products :IProduct[] =[]
  constructor(
    private productService : ProductService,
    private router: ActivatedRoute,
    private routerR: Router,

    private toast: ToastrService,
    private categoryService: CategoryService,
    private cartService : CartService,
    private apoimentService : ApoimentService,
    private fb: UntypedFormBuilder,

  ) {
    this.router.paramMap.subscribe((res) => {
      this.productId = res.get('id') || '';
    });
  }

  ngOnInit(): void {
    this.loadDataCategory();
    this.loadData(this.productId);
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(11)]],
      email: ['', [Validators.email,Validators.required]],
      time: ['', [Validators.required]],
      productId : this.productId,
      sizeId :  this.size.sizeId,
      note: [null, [ Validators.required]],
      status: "WAIT_CONFIRM",
    });
  }

  loadDataCategory(): void {
    this.categoryService.searchCategoriesAutoComplete( true).subscribe(
      (response: any) => {
        const data = response?.body?.data;
        this.categories = data;
        console.log(this.categories)
      },
      (error: any) => {
        this.categories = [];
      }
    );

  }
  loadData(id :string): void {
    this.productService.detail(id).subscribe((respone: any)=> {
      this.productDetail =respone.body?.data;

        this.productSearchRequest.categoryId = this.productDetail.categoryId;
        this.productService.search(this.productSearchRequest).subscribe((response: any) => {
          this.products = response.body?.data;

        });

      console.log(this.productDetail)
      // @ts-ignore
      this.imageUrl = this.productDetail.productImages[0]?.imageUrl;
      // @ts-ignore
      this.sizes = this.productDetail.productSizes;
      this.lengthSize = this.sizes.length -1;
      this.sizes.forEach((item) => {
        this.totalQuantity =this.totalQuantity + (item.quantity ? item.quantity : 0);
      });
    })
  }

  addToCart(): void {
    let quantity: any = this.size.quantity +''
    const cart :Cart = {
      //needFix
      userId : 'be2d6163-7979-40fb-a149-dca33bacad1a',
      amount : this.input_quantity,
      productId :this.productId,
      sizeId: this.size.sizeId
    }

    this.isChosseRadio2 =false;
    if (this.checkedRadio(this.size)){
      this.isChosseRadio2=true;
      this.toast.error('Vui lòng chọn size trước!')
      return
    }
    if(this.input_quantity > quantity) {
      this.toast.error("Sản phẩm không đủ")
    }else {
      this.cartService.addToCart(cart).subscribe(()=>{
        this.toast.success('Thêm vào giỏ hàng thành công');
      })
    }
  }



  checkedRadio(size: ISizeProduct): boolean{
    this.isChosseRadio = (Object.getOwnPropertyNames(this.size).length === 0);
    return this.isChosseRadio
  }

  isVisible = false;
  showModal(): void {
    let quantity: any = this.size.quantity +''
    if (this.checkedRadio(this.size)){
      this.isChosseRadio2=true;
      this.toast.error('Vui lòng chọn size trước!')
      return
    } else
    if(this.input_quantity > quantity) {
      this.toast.error("Sản phẩm không đủ")
    } else {
      this.isVisible = true;
    }
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  datLichHen(): void {
    let quantity: any = this.size.quantity +''
      this.apoimentService.addToCalendar(this.validateForm.value).subscribe((res:any) => {
        this.toast.success("Đặt lịch thành công")
      })


  }
  onChange(result: Date): void {
    console.log('Selected Time: ', result);
  }

  onOk(result: Date | Date[] | null): void {
    console.log('onOk', result);
  }

  onCalendarChange(result: Array<Date | null>): void {
    console.log('onCalendarChange', result);
  }
  showProductDetail(product: IProduct): void {
    this.routerR.navigate([ROUTER_UTILS.product.root, product.productId, 'detail']);
  }
}
