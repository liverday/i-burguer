import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Burguer } from '../../interfaces/burguer';
import { LoadingController, ModalController } from '@ionic/angular';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-burguer-form',
  templateUrl: './burguer-form.component.html',
  styleUrls: ['./burguer-form.component.scss']
})
export class BurguerFormComponent implements OnInit {
  private burguer: Burguer = {};
  constructor(private loadingController: LoadingController, private service: HomeService, public modalController: ModalController) { }

  ngOnInit() {
  }

  onFormSubmit = async (): Promise<void> => {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'crescent',
      translucent: true
    })
    loading.present();
    this.service.addBurguer(this.burguer)
      .subscribe(async (_) => {
        loading.dismiss();
        await this.modalController.dismiss(this.burguer);
      });
  }

  dissmissModal = async (): Promise<void> => {
    await this.modalController.dismiss(null)
  }
}
