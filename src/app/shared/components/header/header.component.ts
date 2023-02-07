import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ROUTER_UTILS} from "../../utils/router.utils";
import {LocalStorageService} from "ngx-webstorage";
import {ToastrService} from "ngx-toastr";
import {CartService} from "../../services/cart.service";
import {CartListComponent} from "../../../pages/user/cart-list/cart-list.component";
import {ProductDetailComponent} from "../../../pages/user/product-detail/product-detail.component";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  count =0;
  message=0;

  // @Output() keyword = new EventEmitter<any>();
  keywordSearch = "";
  isLogin : boolean =false;
  constructor(
    private router: Router,
    private localStorage :LocalStorageService,
    private toast :ToastrService,
    private cartService :CartService,
    private data: DataService
  ) { }

  ngOnInit(): void {
    if(this.localStorage.retrieve("username")){
      this.isLogin =true;
    }
    this.countCart();
    this.data.currentMessage.subscribe(message => this.message = Number(message));
    console.log(this.count)
  }
  countCart(){
    const userId = this.localStorage.retrieve("profile").userId;
    this.cartService.search(userId, true).subscribe((res :any)=>{
      if(res && res.body.data !== null) {
        this.message = res.body?.data?.cartDetailResponseList.length;
      }
    })
  }
  search(){
    this.router.navigate([ROUTER_UTILS.product.list],{queryParams: {keyword: this.keywordSearch}});
  }
  showBought(): void {
    //Do Something
    this.router.navigate([ROUTER_UTILS.bought.list]);
  }

  showUser(): void {
    this.router.navigate([ROUTER_UTILS.qlUser.root]);
  }

  showLogin(): void {
    this.router.navigate([ROUTER_UTILS.login.root]);
  }

  showRegister(): void {
    this.router.navigate([ROUTER_UTILS.register.root]);
  }

  logout(): void {
    this.localStorage.clear('profile');
    this.localStorage.clear('username');
    this.localStorage.clear('isadmin');
    this.localStorage.clear('role');
    this.localStorage.clear('jwt-token');
    this.router.navigate([ROUTER_UTILS.login.root]);
    this.toast.success("Đăng xuất thành công");
  }
  showCart(): void {
    if(this.isLogin){
      window.location.assign('http://localhost:9990/cart/list')
    }else {
      this.router.navigate([ROUTER_UTILS.login.root]);
      this.toast.success("Bạn phải đăng nhập trước");
    }

  }
}
