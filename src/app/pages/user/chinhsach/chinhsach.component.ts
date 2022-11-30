import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-chinhsach',
  templateUrl: './chinhsach.component.html',
  styleUrls: ['./chinhsach.component.scss']
})
export class ChinhsachComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
