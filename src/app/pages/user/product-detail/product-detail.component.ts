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
import {LocalStorageService} from "ngx-webstorage";
import {ICategorySearchRequest} from "../../../shared/models/request/category-search-request.model";
import {ApoimentService} from "../../../shared/services/apoiment.service";
import {IProductImage, ProductImage} from "../../../shared/models/product-image.model";
import {IProductSearchRequest, ProductSearchRequest} from "../../../shared/models/request/product-search-request.model";
import {PAGINATION} from "../../../shared/constants/pagination.constants";
import {ROUTER_UTILS} from "../../../shared/utils/router.utils";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productTrending : IProduct[]=[];
  newProducts : IProduct[]=[];
  isLogin = false;
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
  currentDate:string = '';
  before7ngay:string = '';
  form: FormGroup = new FormGroup({});
  input_quantity= 1;
  validateForm!: UntypedFormGroup;
  productImages: ProductImage[] | undefined = [];
  productSearchRequest: IProductSearchRequest = {
    pageIndex: PAGINATION.PAGE_DEFAULT,
    pageSize: PAGINATION.SIZE_DEFAULT,
  };

  products :IProduct[] =[]
  constructor(
    private productService : ProductService,
    private router: ActivatedRoute,
    private router2 : Router,
    private toast: ToastrService,
    private categoryService: CategoryService,
    private cartService : CartService,
    private apoimentService : ApoimentService,
    private fb: UntypedFormBuilder,

    private localStorage : LocalStorageService
  ) {
    this.router.paramMap.subscribe((res) => {
      this.productId = res.get('id') || '';
    });
  }

  ngOnInit(): void {
    this.currentDate = new Date().getFullYear() + '-' + (new Date().getMonth() +1)+ '-' + new Date().getDate()+ 'T00:00';
      this.before7ngay = new Date().getFullYear() + '-' +(new Date().getMonth() +1)  + '-' + (new Date().getDate() + 7)+ 'T00:00';
    if(this.localStorage.retrieve("username")){
      this.isLogin =true;
    }
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
    this.showProductTrending();
    this.showNewProduct();
  }
  showProductTrending(): void {
    this.productService.trending().subscribe((res :any) =>{
      this.productTrending = res.body?.data;
    });
  }
  showNewProduct(): void {
    const request : ProductSearchRequest= {
      pageSize: 4,
      sortBy: "createAt.desc",
    };
    this.productService.search(request).subscribe((res :any) =>{
      if(res){
        this.newProducts = res.body?.data;
        this.newProducts.forEach((product:IProduct)=>{
          // @ts-ignore
          product.currentImg = product.productImages[0].imageUrl;
          // @ts-ignore
          product.secondImg =product.productImages[1].imageUrl;
          // @ts-ignore
          product.firstImg =product.productImages[0].imageUrl;
          console.log(product)
        })
      }
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
    this.totalQuantity=0;
    this.productService.detail(id).subscribe((respone: any)=> {
      this.productDetail =respone.body?.data;
      console.log(this.productDetail)
      this.productImages =this.productDetail?.productImages;

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
    if(!this.isLogin){
      this.router2.navigate([ROUTER_UTILS.login.root]);
      this.toast.success("Bạn phải đăng nhập trước")
    }
    let quantity: any = this.size.quantity +''
    const id = this.localStorage.retrieve("profile").userId;

    const cart :Cart = {
      //needFix
      userId : id,
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
    }
    else if(this.input_quantity<0){
      this.toast.error('Số lượng sản phẩm phải lớn hơn 0')
    }else {
      this.cartService.addToCart(cart).subscribe(()=>{
        this.toast.success('Thêm vào giỏ hàng thành công');
      },(error:any) =>{
        this.toast.warning(error.error.message);
      });
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
    this.validateForm.get('sizeId')?.setValue(this.size.sizeId);
      this.apoimentService.addToCalendar(this.validateForm.value).subscribe((res:any) => {
        this.toast.success("Đặt lịch thành công")
        this.handleCancel()
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
    this.router2.navigate([ROUTER_UTILS.product.root, product.productId, 'detail']);
    if (product.productId != null) {
      this.loadData(product.productId);
    }
  }
}
