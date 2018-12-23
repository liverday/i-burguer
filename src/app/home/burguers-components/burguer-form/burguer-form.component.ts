import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Burguer } from '../../interfaces/burguer';
import { LoadingController, ModalController, Input } from '@ionic/angular';
import { HomeService } from '../../home.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-burguer-form',
  templateUrl: './burguer-form.component.html',
  styleUrls: ['./burguer-form.component.scss']
})
export class BurguerFormComponent implements OnInit {
  private burguer: Burguer = {};
  constructor(
    private loadingController: LoadingController,
    private service: HomeService,
    public modalController: ModalController,
    private fb: FormBuilder
  ) { }

  form = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    img: [null, Validators.required],
    price: ['', Validators.required]
  })

  get isFormValid() {
    return !this.form.invalid
  }

  ngOnInit() {
  }

  onFormSubmit = async (): Promise<void> => {
    let burguer = { ...this.form.value }
    burguer.price = parseFloat(burguer.price)
    this.burguer = { ...burguer };

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

  selectImage = (inputFile: HTMLInputElement): void => inputFile.click();

  fileChange = (files: FileList): void => {
    let file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this.handleFileRead;
      reader.readAsBinaryString(file);
    }
  }

  handleFileRead = (event): void => {
    let binaryString = event.target.result;
    this.form.patchValue({
      img: `data:image/png;base64,${btoa(binaryString)}`
    })
  }

  dissmissModal = async (): Promise<void> => {
    await this.modalController.dismiss(null)
  }
}

