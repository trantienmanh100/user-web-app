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

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
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
   // this.showProductTrending()
    this.loadDataByCategory(this.categoryId)
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
      console.log(this.categoryById)
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
    this.productService
      .search(this.productSearchRequest)
      .subscribe((response: any) => {
        this.products = response.body?.data;
        this.total = response.body.page.total;
      });
  }

  loadDataByCategory(categoryId?: string) {
    this.products = [];
    this.productSearchRequest.categoryId = categoryId;
    this.productSearchRequest.status = ProductStatus.ACTIVE;
    this.productService.search(this.productSearchRequest).subscribe((response: any) => {
        this.products = response.body?.data;
        this.total = response.body.page.total;
    });
  }

  showProductTrending(): void {
    this.productService.trending().subscribe((res :any) =>{
      this.productTrending = res.body?.data;
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
    console.log(this.form)
    this.productSearchRequest.accessoryId = this.form.get('accessoryId')?.value;
    this.productSearchRequest.categoryId = this.form.get('categoryId')?.value;
    // this.productSearchRequest.endPrice = this.form.get('endPrice')?.value;
    this.productSearchRequest.gender = this.form.get('gender')?.value;
    this.productSearchRequest.keyword = this.form.get('keyword')?.value;
    this.productSearchRequest.materialId = this.form.get('materialId')?.value;
    // this.productSearchRequest.startPrice = this.form.get('startPrice')?.value;
    this.productSearchRequest.status = this.form.get('status')?.value;
    // this.productSearchRequest.vendorId = this.form.get('vendorId')?.value;
    console.log(this.productSearchRequest)
    this.loadData(this.pageIndex, this.pageSize);
  }
}
