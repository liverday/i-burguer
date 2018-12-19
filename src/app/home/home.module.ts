import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';
import { BurguersResolver, HomeService } from './home.service';
import { BurguerListComponent } from './burguers-components/burguer-list/burguer-list.component';
import { BurguerItemComponent } from './burguers-components/burguer-list/burguer-item/burguer-item.component';
import { BurguerFormComponent } from './burguers-components/burguer-form/burguer-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        resolve: {
          burguers: BurguersResolver
        }
      }
    ])
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [HomePage, BurguerListComponent, BurguerItemComponent, BurguerFormComponent],
  entryComponents: [
    BurguerFormComponent
  ],
  providers: [HomeService, BurguersResolver]
})
export class HomePageModule {}
