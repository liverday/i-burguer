import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Burguer } from './interfaces/burguer';
import { LoadingController, InfiniteScroll, ModalController, AlertController, ActionSheetController } from '@ionic/angular';
import { BurguersService } from './burguers.service';
import { catchError } from 'rxjs/operators';
import { BurguerFilterModalComponent } from './burguers-components/burguer-filter-modal/burguer-filter-modal.component';
import { Category } from '../categories/interfaces/category';
import { OverlayEventDetail } from '@ionic/core';

@Component({
    selector: 'app-burguer',
    templateUrl: 'burguers.page.html',
    styleUrls: ['burguers.page.scss']
})
export class BurguersPage {
    burguers: Burguer[] = [];
    categories: Category[] = [];
    showForm: boolean = false;
    searchText: string;
    pageSize: number = 5;
    page: number;
    direction: string = 'desc';
    orderBy: string = 'price';

    @ViewChild('infiniteScroll') infiniteScroll: InfiniteScroll;

    constructor(
        private route: ActivatedRoute,
        private loadingController: LoadingController,
        private service: BurguersService,
        private modalController: ModalController,
        private actionSheetController: ActionSheetController
    ) {
        this.burguers = this.route.snapshot.data.burguers;
        this.categories = this.route.snapshot.data.categories;
        this.page = 0;
    }

    ngOnInit(): void {
        if (this.burguers.length < this.pageSize) {
            this.infiniteScroll.disabled = true;
        }
    }

    onSearchBarChanged = async (): Promise<void> => {
        this.reloadData()
    }

    loadMoreData = async (): Promise<void> => {
        this.infiniteScroll.disabled = false
        this.page++;
        try {
            const filter = await this.service.getFilter();
            this.service.getBurguers({ ...filter, name: this.searchText }, this.page, this.pageSize, this.orderBy, this.direction)
                .pipe(catchError(e => { throw e }))
                .subscribe((response: Burguer[]) => {
                    if (response.length > 0) {
                        this.burguers = this.burguers.concat(response);
                    } else {
                        this.page--;
                        this.infiniteScroll.disabled = true;
                    }
                    this.infiniteScroll.complete();
                })
        } catch (e) {
            console.error(e);
        }
    }

    openFilterModal = async (): Promise<void> => {
        const modal = await this.modalController.create({
            component: BurguerFilterModalComponent,
            componentProps: {
                modalController: this.modalController,
                categories: this.categories
            }
        });

        await modal.present();
        let filter = await modal.onDidDismiss();

        if (filter.data) {
            this.reloadData();
        }
    }

    reloadData = async (): Promise<void> => {
        this.page = 0;
        const loading = await this.loadingController.create({
            message: 'Fetching burguers...'
        });

        await loading.present();

        try {
            const filter = await this.service.getFilter();
            this.service.getBurguers({ ...filter, name: this.searchText }, this.page, this.pageSize, this.orderBy, this.direction)
                .pipe(catchError(e => { throw e }))
                .subscribe((response: Burguer[]) => {
                    this.burguers = response;
                    if (this.burguers.length < this.pageSize)
                        this.infiniteScroll.disabled = true;
                    else {
                        this.infiniteScroll.disabled = false;
                    }
                    loading.dismiss();
                })
        } catch (e) {
            console.error(e)
            loading.dismiss();
        }
    }

    changeDirection = (direction: string): void => {
        this.direction = direction;
        this.reloadData();
    }

    presentOrderByAlert = async (): Promise<void> => {
        const alert = await this.actionSheetController.create({
            header: 'Select an option to order by',
            buttons: [
                {
                    text: 'Price',
                    icon: this.orderBy == 'price' ? 'checkmark' : null,
                    handler: () => {
                        this.orderBy = 'price'
                    }
                },
                {
                    text: 'Category',
                    icon: this.orderBy == 'category' ? 'checkmark' : null,
                    handler: () => {
                        this.orderBy = 'category'
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                }
            ]
        })

        await alert.present();
        let dissmisObj = await alert.onDidDismiss();
        
        if (dissmisObj.role != 'cancel') {
          await this.reloadData();
        }
    }
}
