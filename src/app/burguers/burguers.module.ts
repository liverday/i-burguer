import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BurguersPage } from './burguers.page';
import { HttpClientModule } from '@angular/common/http';
import { BurguersResolver, BurguersService, BurguerEmitterService } from './burguers.service';
import { BurguerListComponent } from './burguers-components/burguer-list/burguer-list.component';
import { BurguerItemComponent } from './burguers-components/burguer-list/burguer-item/burguer-item.component';
import { BurguersRoutingModule } from './burguer-routing.module';
import { CartService } from '../cart/cart.service';
import { BurguerFilterModalComponent } from './burguers-components/burguer-filter-modal/burguer-filter-modal.component';
import { CategoriesResolver, CategoryService } from '../categories/categories.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BurguersRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [BurguersPage, BurguerListComponent, BurguerItemComponent, BurguerFilterModalComponent],
  entryComponents: [BurguerFilterModalComponent],
  providers: [BurguersService, BurguersResolver, BurguerEmitterService, CartService, CategoryService, CategoriesResolver]
})
export class BurguersModule {}
