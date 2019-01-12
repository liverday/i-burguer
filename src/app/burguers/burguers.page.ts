import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Burguer } from './interfaces/burguer';
import { LoadingController, InfiniteScroll } from '@ionic/angular';
import { BurguersService } from './burguers.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-burguer',
  templateUrl: 'burguers.page.html',
  styleUrls: ['burguers.page.scss']
})
export class BurguersPage {
  burguers: Burguer[] = [];
  showForm: boolean = false;
  searchText: string;
  pageSize: number = 5;
  page: number;

  @ViewChild('infiniteScroll') infiniteScroll: InfiniteScroll;

  constructor(private route: ActivatedRoute, private loadingController: LoadingController, private service: BurguersService) {
    this.burguers = this.route.snapshot.data.burguers;
    this.page = 0;
  }

  onSearchBarChanged = async (): Promise<void> => {
    this.page = 0;
    const loading = await this.loadingController.create({
      message: 'Fetching burguers...'
    });

    await loading.present();

    try {
      this.service.getBurguers(this.searchText, this.page, this.pageSize)
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

  loadMoreData = (): void => {
    this.page++;
    try {
      this.service.getBurguers(this.searchText, this.page, this.pageSize)
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
}
