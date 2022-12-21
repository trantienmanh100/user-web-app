import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ProductListComponent} from "./pages/user/product-list/product-list.component";
import { ProductDetailComponent } from './pages/user/product-detail/product-detail.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NzRateModule } from 'ng-zorro-antd/rate';
import {PipeModule} from "./shared/pipe/pipe.module";
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeComponent } from './pages/user/home/home.component';
import {ToastrModule, ToastrService} from "ngx-toastr";
import { CartListComponent } from './pages/user/cart-list/cart-list.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {NZ_I18N, vi_VN, en_US} from "ng-zorro-antd/i18n";
import {NZ_ICONS} from "ng-zorro-antd/icon";
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import {NzModalModule, NzModalService} from "ng-zorro-antd/modal";
import {NzSelectModule} from "ng-zorro-antd/select";
import { RefundComponent } from './pages/user/bought/refund/refund.component';
import { BoughtComponent } from './pages/user/bought/bought.component';
import { MenuUserComponent } from './shared/components/menu-user/menu-user.component';
import {QLUserComponent} from './pages/user/qluser/qluser.component';
import { ChangeComponent } from './pages/user/qluser/change/change.component';
import { PaymentSuccessComponent } from './pages/user/cart-list/payment-success/payment-success.component';
import { ChinhsachComponent } from './pages/user/chinhsach/chinhsach.component';
import { LoginComponent } from './pages/user/login/login.component';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import { NgxWebstorageModule } from 'ngx-webstorage';
import {PaginationComponent} from "./shared/components/pagination/pagination.component";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {BookComponent} from "./pages/user/cart-list/book/book.component";
import { RegisterComponent } from './pages/user/register/register.component';
import {NzRadioModule} from "ng-zorro-antd/radio";
import { DetailComponent } from './pages/user/bought/detail/detail.component';
import {MdbCarouselModule} from "mdb-angular-ui-kit/carousel";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {UploadImageComponent} from "./shared/components/upload-image/upload-image.component";

registerLocaleData(en);

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
    RefundComponent,
    BoughtComponent,
    CartListComponent,
    MenuUserComponent,
    QLUserComponent,
    ChangeComponent,
    PaymentSuccessComponent,
    ChinhsachComponent,
    LoginComponent,
    BookComponent,
    PaginationComponent,
    RegisterComponent,
    DetailComponent,
    UploadImageComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        NzRateModule,
        FormsModule,
        NgxWebstorageModule.forRoot(),
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
        NzModalModule,
        NzButtonModule,
        ReactiveFormsModule,
        NzGridModule,
        NzFormModule,
        NzInputModule,
        NzDatePickerModule,
        NzDropDownModule,
        NzRadioModule,
        MdbCarouselModule,
        NzCheckboxModule,
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
export class  AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `./assets/i18n/`, '.json');
}
