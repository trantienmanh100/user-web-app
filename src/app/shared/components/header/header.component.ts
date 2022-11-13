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
  showCartDetail(): void {
    this.router.navigate([ROUTER_UTILS.cart.detail]);
  }

}
