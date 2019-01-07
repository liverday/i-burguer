import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Burguer } from './interfaces/burguer';

@Component({
  selector: 'app-burguer',
  templateUrl: 'burguers.page.html',
  styleUrls: ['burguers.page.scss']
})
export class BurguersPage {
  burguers: Burguer[] = [];
  showForm: boolean = false;
  constructor(private route: ActivatedRoute) {
    this.burguers = this.route.snapshot.data.burguers;
  }
}
