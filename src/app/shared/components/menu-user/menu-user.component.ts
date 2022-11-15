import { Component, OnInit } from '@angular/core';
import {ROUTER_UTILS} from "../../utils/router.utils";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.scss']
})
export class MenuUserComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
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
