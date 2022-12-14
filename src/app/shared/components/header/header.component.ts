import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ROUTER_UTILS} from "../../utils/router.utils";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
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

  showDangxuat(): void {
    alert("Dang xuat")
  }

  showCart(): void {
    this.router.navigate([ROUTER_UTILS.cart.list]);
  }
}
