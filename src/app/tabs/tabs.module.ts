import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsPageComponent } from './tabs-page/tabs-page.component';
import { TabsRoutingModule } from './tabs-routing.module';
import { IonicModule } from '@ionic/angular';
import { BurguerEmitterService } from '../burguers/burguers.service';

@NgModule({
  declarations: [TabsPageComponent],
  imports: [
    CommonModule, 
    TabsRoutingModule, 
    IonicModule
  ]
})
export class TabsModule { }
