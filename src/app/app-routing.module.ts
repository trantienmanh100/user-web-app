import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ROUTER_ACTIONS, ROUTER_UTILS} from "./shared/utils/router.utils";
import {ProductListComponent} from "./pages/user/product-list/product-list.component";
import {ProductDetailComponent} from "./pages/user/product-detail/product-detail.component";


const routes: Routes = [
  {
    path: '',
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
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
