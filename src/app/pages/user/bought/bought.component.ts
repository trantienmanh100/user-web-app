import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ROUTER_UTILS} from "../../../shared/utils/router.utils";

@Component({
  selector: 'app-bought',
  templateUrl: './bought.component.html',
  styleUrls: ['./bought.component.scss']
})
export class BoughtComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }


}
