import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsPageComponent } from './tabs-page/tabs-page.component';
import { BurguersModule } from '../burguers/burguers.module';
import { CartModule } from '../cart/cart.module';
import { TabsRoutingModule } from './tabs-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [TabsPageComponent],
  imports: [
    CommonModule, 
    TabsRoutingModule, 
    IonicModule
  ]
})
export class TabsModule { }
