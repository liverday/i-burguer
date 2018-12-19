import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Burguer } from './interfaces/burguer';
import { LoadingController, ModalController } from '@ionic/angular';
import { HomeService } from './home.service';
import { BurguerFormComponent } from './burguers-components/burguer-form/burguer-form.component';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  burguers: Burguer[] = [];
  burguer: Burguer = {};
  showForm: boolean = false;
  constructor(private route: ActivatedRoute, public modalController: ModalController, private loadingController: LoadingController, private service: HomeService) {
    this.burguers = route.snapshot.data.burguers;
  }

  openModalForm = async (): Promise<void> => {
    const modal: HTMLIonModalElement  = await this.modalController.create({
      component: BurguerFormComponent
    })

    modal.onDidDismiss().then((result: OverlayEventDetail<Burguer>) => {
      if (result.data) {
        this.burguers = this.burguers.concat(result.data);
      }
    }); 

    await modal.present();
  }
}
