import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ROUTER_ACTIONS, ROUTER_UTILS} from "./shared/utils/router.utils";
import {ProductListComponent} from "./pages/user/product-list/product-list.component";
import {ProductDetailComponent} from "./pages/user/product-detail/product-detail.component";
import {HomeComponent} from "./pages/user/home/home.component";
import {CartListComponent} from "./pages/user/cart-list/cart-list.component";
import {RefundComponent} from "./pages/user/bought/refund/refund.component";
import {BoughtComponent} from "./pages/user/bought/bought.component";
import {ChangeComponent} from "./pages/user/qluser/change/change.component";
import {QluserComponent} from "./pages/user/qluser/qluser.component";
import {PaymentSuccessComponent} from "./pages/user/cart-list/payment-success/payment-success.component";
import {ChinhsachComponent} from "./pages/user/chinhsach/chinhsach.component";
import {LoginComponent} from "./pages/user/login/login.component";
import {BookComponent} from "./pages/user/cart-list/book/book.component";
import {RegisterComponent} from "./pages/user/register/register.component";
import {DetailComponent} from "./pages/user/bought/detail/detail.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: ROUTER_UTILS.bought.list,
    component: BoughtComponent,
  },

  // bought end
  {
    path: ROUTER_UTILS.refund.list,
    component: RefundComponent,
  },
  {
    path: ROUTER_UTILS.product.list,
    component: ProductListComponent
  },
  {
    path: ROUTER_UTILS.product.productDetail,
    component: ProductDetailComponent,
    data: {
      title: 'sidebar.productDetail',
      action: ROUTER_ACTIONS.detail,
    },
  },
  {
    path: ROUTER_UTILS.product.productCate,
    component: ProductListComponent,
    data: {
      title: 'sidebar.productCate',
      action: ROUTER_ACTIONS.detail,
    },
  },
  {
    path: ROUTER_UTILS.cart.list,
    component: CartListComponent,
  },
  {
    path: ROUTER_UTILS.payment.root,
    component: PaymentSuccessComponent,
  },
  {
    path: ROUTER_UTILS.change.root,
    component: ChangeComponent,
  },
  {
    path: ROUTER_UTILS.qlUser.root,
    component: QluserComponent,
  },
  {
    path: ROUTER_UTILS.chinhsach.root,
    component: ChinhsachComponent,
  },
  {
    path: ROUTER_UTILS.login.root,
    component: LoginComponent,
  },
  {
    path: ROUTER_UTILS.book.root,
    component: BookComponent,
  },
  {
    path: ROUTER_UTILS.register.root,
    component: RegisterComponent,
  },
  {
    path: ROUTER_UTILS.detail.list,
    component: DetailComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
