import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {ROUTER_UTILS} from "../../utils/router.utils";
import {LocalStorageService} from "ngx-webstorage";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // @Output() keyword = new EventEmitter<any>();
  keywordSearch = "";
  isLogin : boolean =false;
  constructor(
    private router: Router,
    private localStorage :LocalStorageService,
    private toast :ToastrService
  ) { }

  ngOnInit(): void {
    console.log(this.localStorage.retrieve("username"))
    if(this.localStorage.retrieve("username")){
      this.isLogin =true;
    }
  }
  search(){
      this.router.navigate([ROUTER_UTILS.product.list, ]);
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
    this.router.navigate([ROUTER_UTILS.base.home]);
    this.toast.success("Đăng xuất thành công");
  }
  showCart(): void {
    if(this.isLogin){
      this.router.navigate([ROUTER_UTILS.cart.list]);
    }else {
      this.router.navigate([ROUTER_UTILS.login.root]);
      this.toast.success("Bạn phải đăng nhập trước");
    }

  }
}
