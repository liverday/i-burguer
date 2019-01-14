import { BurguersPage } from './burguers.page';
import { BurguersResolver } from './burguers.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesResolver } from '../categories/categories.service';

const routes: Routes = [
    {
      path: '',
      component: BurguersPage,
      resolve: {
        burguers: BurguersResolver,
        categories: CategoriesResolver
      },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BurguersRoutingModule { }