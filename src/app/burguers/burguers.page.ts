import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Burguer } from './interfaces/burguer';
import { LoadingController } from '@ionic/angular';
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

  constructor(private route: ActivatedRoute, private loadingController: LoadingController, private service: BurguersService) {
    this.burguers = this.route.snapshot.data.burguers;
  }

  onSearchBarChanged = async (): Promise<void> => {
    const loading = await this.loadingController.create({
      message: 'Fetching burguers...'
    });

    await loading.present();

    try {
      this.service.getBurguers(this.searchText)
        .pipe(catchError(e => { throw e }))
        .subscribe((response: Burguer[]) => {
          this.burguers = response;
          loading.dismiss();
        })
    } catch (e) {
      console.error(e)
      loading.dismiss();
    }
  }
}
