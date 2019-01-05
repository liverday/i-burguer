import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPageComponent } from './tabs-page/tabs-page.component';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPageComponent,
        children: [
            {
                path: 'cart',
                children: [
                    {
                        path: '',
                        loadChildren: '../cart/cart.module#CartModule'
                    }
                ]
            },
            {
                path: 'burguers',
                children: [
                    {
                        path: '',
                        loadChildren: '../burguers/burguers.module#BurguersModule'
                    }
                ]
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/burguers',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsRoutingModule { }
