import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ProductListComponent} from "./pages/user/product-list/product-list.component";
import { ProductDetailComponent } from './pages/user/product-detail/product-detail.component';
import {FormsModule} from "@angular/forms";
import { NzRateModule } from 'ng-zorro-antd/rate';
import {PipeModule} from "./shared/pipe/pipe.module";
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeComponent } from './pages/user/home/home.component';
import {ToastrModule, ToastrService} from "ngx-toastr";
import { CartListComponent } from './pages/user/cart-list/cart-list.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {NZ_I18N, vi_VN} from "ng-zorro-antd/i18n";
import {NZ_ICONS} from "ng-zorro-antd/icon";
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import {NzModalService} from "ng-zorro-antd/modal";
import {NzSelectModule} from "ng-zorro-antd/select";

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key]
);

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    FooterComponent,
    ProductDetailComponent,
    HeaderComponent,
    HomeComponent,
    CartListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NzRateModule,
    FormsModule,
    PipeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      useDefaultLang: true,
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    NzSelectModule,
    //NgbModule,
  ],
  providers: [
    NzModalService,
    ToastrService,
    { provide: NZ_I18N, useValue: vi_VN },
    { provide: NZ_ICONS, useValue: icons },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `./assets/i18n/`, '.json');
}
