import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsPageComponent } from './tabs-page/tabs-page.component';
import { TabsRoutingModule } from './tabs-routing.module';
import { IonicModule } from '@ionic/angular';
import { CartCountResolver, CartService } from '../cart/cart.service';

@NgModule({
  declarations: [TabsPageComponent],
  imports: [
    CommonModule, 
    TabsRoutingModule, 
    IonicModule
  ], 
  providers: [CartCountResolver, CartService]
})
export class TabsModule { }
