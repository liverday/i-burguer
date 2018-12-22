import { Component, Input, OnInit } from '@angular/core';
import { Burguer } from '../../../interfaces/burguer';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'burguer-item',
  templateUrl: './burguer-item.component.html',
  styleUrls: ['./burguer-item.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '100px',
        opacity: 1
      })),
      state('closed', style({
        height: '0px',        
        opacity: 0
      })),
      transition('open <=> closed', [
        animate('0.25s ease-out')
      ])
    ])
  ]
})
export class BurguerItemComponent implements OnInit {
  @Input() burguer: Burguer

  isExpanded: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleExpanded = (): void => {
    this.isExpanded = !this.isExpanded
  }
}
