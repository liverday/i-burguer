import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Burguer } from './interfaces/burguer';
import { LoadingController, InfiniteScroll, ModalController } from '@ionic/angular';
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

  @ViewChild('infiniteScroll') infiniteScroll: InfiniteScroll;

  constructor(private route: ActivatedRoute, private loadingController: LoadingController, private service: BurguersService, private modalController: ModalController) {
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
      this.service.getBurguers({ ...filter, name: this.searchText }, this.page, this.pageSize)
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
      this.service.getBurguers({ ...filter, name: this.searchText }, this.page, this.pageSize)
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
}
