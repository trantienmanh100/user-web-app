import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
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
import {DataService} from "../../../shared/services/data.service";
import CommonUtil from "../../../shared/utils/common-utils";
import {TranslateService} from "@ngx-translate/core";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  count ='';
  message:string ='';
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
    private translateService: TranslateService,
    private toast: ToastrService,
    private categoryService: CategoryService,
    private cartService : CartService,
    private modalService: NzModalService,
    private apoimentService : ApoimentService,
    private fb: UntypedFormBuilder,

    private localStorage : LocalStorageService,
    private data :DataService,
  ) {
    this.router.paramMap.subscribe((res) => {
      this.productId = res.get('id') || '';
    });
  }

  ngOnInit(): void {
    this.currentDate = new Date().getFullYear() + '-0' + (new Date().getMonth() +1)+ '-0' + new Date().getDate()+ 'T00:00';
      this.before7ngay = new Date().getFullYear() + '-0' +(new Date().getMonth() +1)  + '-' + (new Date().getDate() + 7)+ 'T00:00';
    if(this.localStorage.retrieve("username")){
      this.isLogin =true;
    }
    this.loadDataCategory();
    this.loadData(this.productId);
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required]],
      phoneNumber: ['', [
        Validators.required,
        Validators.maxLength(12),
        Validators.pattern( '^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$',)
      ]],
      email: ['', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern( '^(\\s){0,}[a-zA-Z][a-zA-Z0-9_\\.\-]{1,50}@[a-zA-Z0-9\-_]{2,}(\\.[a-zA-Z0-9\]{2,4}){1,2}(\\s){0,}$',)
      ]],
      time: ['', [Validators.required]],
      productId : this.productId,
      sizeId :  this.size.sizeId,
      note: [''],
      status: "WAIT_CONFIRM",
    });
    this.showProductTrending();
    this.showNewProduct();
    this.data.currentMessage.subscribe(message => this.message =message);
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
          product.secondImg =product.productImages[1] ? product.productImages[1].imageUrl : product.productImages[0].imageUrl;
          // @ts-ignore
          product.firstImg =product.productImages[0].imageUrl;
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
        this.countCart();
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
    const datlich =CommonUtil.modalConfirm(
      this.translateService,
      'Đặt lịch',
      'Bạn có muốn đặt lịch hẹn không',
      {name: 'a'}
    )
    const modal: NzModalRef =this.modalService.create(datlich);
    modal.afterClose.subscribe((result:{success: boolean; data: any}) => {
      if(result?.success){
        let quantity: any = this.size.quantity +''
        this.validateForm.get('sizeId')?.setValue(this.size.sizeId);
        this.apoimentService.addToCalendar(this.validateForm.value).subscribe((res:any) => {
          this.toast.success("Đặt lịch thành công")
          this.validateForm.reset();
          this.handleCancel()
        })
      }
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

  countCart(){
    const userId = this.localStorage.retrieve("profile").userId;
    this.cartService.search(userId, true).subscribe((res :any)=>{
      if(res && res.body.data !== null) {
        console.log(res.body.data);
        this.count = res.body?.data?.cartDetailResponseList.length;
        this.data.changeMessage(this.count+'');
      }
    })
  }
}
