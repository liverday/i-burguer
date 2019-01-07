import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart.component';
import { CartResolver } from './cart.service';

const routes: Routes = [
  { 
    path: '', 
    component: CartComponent,
    resolve: {
      cartItems: CartResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
