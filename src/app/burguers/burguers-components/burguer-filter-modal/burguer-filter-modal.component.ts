import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from '../../../categories/interfaces/category';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BurguersService } from '../../burguers.service';

@Component({
  selector: 'app-burguer-filter-modal',
  templateUrl: './burguer-filter-modal.component.html',
  styleUrls: ['./burguer-filter-modal.component.scss']
})
export class BurguerFilterModalComponent implements OnInit {

  @Input() modalController: ModalController;
  @Input() categories: Category[];

  filter: any = {};

  form = this.formBuilder.group({
    category: [null, Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private service: BurguersService) {
    this.service.getFilter().then(filter => {
      if (filter) {
        this.filter = { ...filter };
      }

      Object.keys(this.filter).forEach(k => {
        if (this.form.controls[k]) {
          this.form.controls[k].patchValue(this.filter[k])
        }
      })
    });
  }

  ngOnInit() {
  }

  closeModal = async (): Promise<void> => {
    await this.modalController.dismiss(null);
  }

  onFilterSubmit = async (): Promise<void> => {
    this.filter = { ...this.form.value };
    this.service.setFilter(this.filter);

    await this.modalController.dismiss({ filter: this.filter });
  }

  removeFilter = async (): Promise<void> => {
    await this.service.removeFilter();
    await this.modalController.dismiss({ filter: -1 });
  }
}
