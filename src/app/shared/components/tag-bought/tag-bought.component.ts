import { Component, OnInit } from '@angular/core';
import {ROUTER_UTILS} from "../../utils/router.utils";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tag-bought',
  templateUrl: './tag-bought.component.html',
  styleUrls: ['./tag-bought.component.scss']
})
export class TagBoughtComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  showWaitConfirm(): void {
    this.router.navigate([ROUTER_UTILS.bought.waitconfirm]);
  }
  showWaitGoods(): void {
    this.router.navigate([ROUTER_UTILS.bought.waitgoods]);
  }
  showChange(): void {
    this.router.navigate([ROUTER_UTILS.refund.list]);
  }
}
