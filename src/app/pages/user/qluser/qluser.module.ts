import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {QluserComponent} from "./qluser.component";

@NgModule({
  declarations: [
    QluserComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
  ],
})
export class  AppModule { }

