import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {ProductListComponent} from "./pages/user/product-list/product-list.component";
import { ProductDetailComponent } from './pages/user/product-detail/product-detail.component';
import {FormsModule} from "@angular/forms";
import { NzRateModule } from 'ng-zorro-antd/rate';
import {PipeModule} from "./shared/pipe/pipe.module";

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    FooterComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NzRateModule,
    FormsModule,
    PipeModule
    //NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
