import { Component, Input, OnInit } from '@angular/core';
import { Burguer } from '../../../interfaces/burguer';

@Component({
  selector: 'burguer-item',
  templateUrl: './burguer-item.component.html',
  styleUrls: ['./burguer-item.component.scss']
})
export class BurguerItemComponent implements OnInit {
  @Input() burguer: Burguer

  constructor() { }

  ngOnInit() {
  }

}
