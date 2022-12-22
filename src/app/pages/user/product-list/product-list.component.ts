import {Component, OnInit} from '@angular/core';
import {IProduct, Product} from "../../../shared/models/product.model";
import {PAGINATION} from "../../../shared/constants/pagination.constants";
import {IProductSearchRequest, ProductStatus} from "../../../shared/models/request/product-search-request.model";
import {ProductService} from "../../../shared/services/product.service";
import {ROUTER_UTILS} from "../../../shared/utils/router.utils";
import {ActivatedRoute, Router} from "@angular/router";
import {Category, ICategory} from "../../../shared/models/category.model";
import {CategoryService} from "../../../shared/services/category.service";
import {TranslateService} from "@ngx-translate/core";
import {Accessory} from "../../../shared/models/accesory.model";
import {AccessoryService} from "../../../shared/services/accessory.service";
import {AccessorySearchRequest} from "../../../shared/models/request/accessory-search-request.model";
import {Size} from "../../../shared/models/size.model";
import {SizeService} from "../../../shared/services/size.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Checkbox} from "../../../shared/models/checkbox-options..model";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  priceRange!: string;
  checkOptions: Checkbox[]=[] ;
  checkboxSize: Checkbox []=[];
  accessoryIds: string[] =[];
  sizeIds: string[] =[];
  form: FormGroup = new FormGroup({});
  products: Product[] = [];
  size : Size[] =[];
  accessories : Accessory [] = [];
  productTrending : IProduct[]=[];
  productSearchRequest: IProductSearchRequest = {
    pageIndex: PAGINATION.PAGE_DEFAULT,
    pageSize: PAGINATION.SIZE_DEFAULT,
  };
  categories: Category[] = [];
  categoryId? : string;
  categoryById : ICategory= {};
  pageIndex = PAGINATION.PAGE_DEFAULT;
  pageSize = PAGINATION.SIZE_DEFAULT;
  total = 0;

  constructor(
    private translateService: TranslateService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private accessoryService : AccessoryService,
    private router: Router,
    private Activeroute: ActivatedRoute,
    private sizeService: SizeService,
    private fb: FormBuilder,

  ) {
    this.Activeroute.paramMap.subscribe((res) => {
      this.categoryId = res.get('id') || '';
    });
  }

  ngOnInit(): void {
    this.loadAccessory(),
    this.loadSize();
    this.loadNameCate(),
    this.loadCategory(),
    // this.loadData(this.pageNumber, this.pageSize);
    this.showProductTrending();
      this.Activeroute.queryParamMap.subscribe((res) => {
        const keyword = res.get('keyword') || '';
        console.log(keyword);

        if(!keyword || keyword === ''){
          this.productSearchRequest.keyword = '';
          this.loadDataByCategory(this.categoryId)
        }else{
          this.productSearchRequest.keyword = keyword;
          this.loadDataByCategory();
        }
      });
    this.initForm();

  }

  initForm() {
    this.form = this.fb.group({
      keyword: [this.productSearchRequest.keyword || ''],
      categoryId: [this.productSearchRequest.categoryId || null],
      // rangePrice: [[this.minPrice, this.maxPrice]],
      // startPrice: [this.productSearchRequest.startPrice || this.minPrice],
      // endPrice: [this.productSearchRequest.endPrice || this.maxPrice],
      gender: [this.productSearchRequest.gender || null],
      materialId: [this.productSearchRequest.materialId || null],
      vendorId: [this.productSearchRequest.vendorId || null],
      accessoryId: [this.productSearchRequest.accessoryId || null],
    });
  }

  loadAccessory(){
    const params : AccessorySearchRequest = {
    }
    this.accessoryService.search(params).subscribe((res:any) => {
      this.accessories = res.body?.data;
      this.checkOptions = this.accessories.map(data=>new Checkbox(data.accessoryId,data.name));
    })

  }
  loadSize(){
    this.sizeService.autoComplete(true).subscribe((res:any) => {
      this.size = res.body.data;
    })
  }


  loadNameCate(){
    this.categoryService.findByCategoryId(this.categoryId+'').subscribe((res:any) => {
      this.categoryById = res.body?.data;
    })
  }

  loadCategory():void {
      this.categoryService.searchCategoriesAutoComplete(true).subscribe((response: any)=> {
        this.categories = response.body?.data
      },
      (error: any) => {
      this.categories = [];
    })
  }

  loadData(pageIndex: number, pageSize: number, sortBy?: string) {

    this.productSearchRequest.pageIndex = pageIndex;
    this.productSearchRequest.pageSize = pageSize;
    this.productSearchRequest.sortBy = sortBy;
    this.productSearchRequest.status = ProductStatus.ACTIVE;
    this.productService
      .search(this.productSearchRequest)
      .subscribe((response: any) => {
        this.products = response.body?.data;
        this.total = response.body.page.total;
      });
  }

  loadDataByCategory(categoryId?: string) {
    this.productSearchRequest = {};
    this.products = [];
    this.productSearchRequest.pageIndex = PAGINATION.PAGE_DEFAULT;
    this.productSearchRequest.pageSize =PAGINATION.SIZE_DEFAULT;
    this.productSearchRequest.categoryId = categoryId;
    this.productSearchRequest.status = ProductStatus.ACTIVE;
    console.log(this.productSearchRequest)
    this.productService.search(this.productSearchRequest).subscribe((response: any) => {
        this.products = response.body?.data;
        this.total = response.body.page.total;
    });
  }

  showProductTrending(): void {
    this.productService.trending().subscribe((res :any) =>{
      if(res){
        this.productTrending = res.body?.data;
        this.productTrending.forEach((product:IProduct)=>{
          // @ts-ignore
          product.currentImg = product.productImages[0].imageUrl;
        })
      }
    });
  }

  showProductDetail(product: IProduct): void {
    this.router.navigate([ROUTER_UTILS.product.root, product.productId, 'detail']);
  }

  onQuerySearch(params: any): void {
    const { pageIndex, pageSize } = params;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.loadData(this.pageIndex, this.pageSize);
  }

  search() {
    this.productSearchRequest.accessoryId = this.accessoryIds;
    this.productSearchRequest.categoryId = this.form.get('categoryId')?.value;
    this.productSearchRequest.gender = this.form.get('gender')?.value;
    this.productSearchRequest.keyword = this.form.get('keyword')?.value;
    this.productSearchRequest.materialId = this.form.get('materialId')?.value;
    this.productSearchRequest.status = this.form.get('status')?.value;
    // this.productSearchRequest.vendorId = this.form.get('vendorId')?.value;
    console.log(this.productSearchRequest)
    this.loadData(this.pageIndex, this.pageSize);
  }
  //search theo accessory
  checkbox(value: object[]): void {
    this.accessoryIds = [];
    value.forEach((value)=>{
      // @ts-ignore
      if(value.checked){
       // @ts-ignore
        this.accessoryIds.push(value.value);
      }
    })
  }
  initCheckboxSize(value: object[]): void {
    this.sizeIds = [];
    value.forEach((value)=>{
      // @ts-ignore
      if(value.checked){
        // @ts-ignore
        this.sizeIds.push(value.value);
      }
    })
  }

  radioPrice(priceRange: string){

    switch (priceRange) {
      case '1':
        this.productSearchRequest.startPrice = 0;
        this.productSearchRequest.endPrice= 1000000;
        break;
      case '2':
        this.productSearchRequest.startPrice = 1000000;
        this.productSearchRequest.endPrice= 5000000;
        break;
      case '3':
        this.productSearchRequest.startPrice = 5000000;
        this.productSearchRequest.endPrice= 10000000;
        break;
      case '4':
        this.productSearchRequest.startPrice = 1000000;
        this.productSearchRequest.endPrice= 20000000;
        break;

    }
  }

  resetSearch(){
    this.form.reset();
    this.priceRange= '';
    this.productSearchRequest = {};
    this.pageIndex = PAGINATION.PAGE_DEFAULT;
    this.pageSize = PAGINATION.SIZE_DEFAULT;
    this.loadAccessory();
    this.productSearchRequest.accessoryId = [];
    this.loadData(this.pageIndex, this.pageSize);
  }


}
