import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ROUTER_UTILS} from "../../../../shared/utils/router.utils";

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

}
