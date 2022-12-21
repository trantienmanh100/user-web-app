import { Component, OnInit } from '@angular/core';
import {ROUTER_UTILS} from "../../utils/router.utils";
import {Router} from "@angular/router";
import {Order} from "../../models/order.model";
import {OrderService} from "../../services/order.service";
import {LocalStorageService} from "ngx-webstorage";
import {IUser} from "../../models/user.model";

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.scss']
})
export class MenuUserComponent implements OnInit {
  order: Order[] = [];
  user : IUser = {}
  imgUrl ='../../../../../assets/images/User.jpg';

  constructor(
    private router: Router,
    private orderService :OrderService,
    private localStorage :LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.user = this.localStorage.retrieve("profile");
    if(this.user.imageUrl != null){
      this.imgUrl = this.user.imageUrl;
    }
    console.log(this.user)
  }
  qlAccount():void {
    this.router.navigate([ROUTER_UTILS.qlUser.root])
  }
  bought():void {
    this.router.navigate([ROUTER_UTILS.bought.list])

  }
  change():void {
    this.router.navigate([ROUTER_UTILS.change.root])
  }
}

