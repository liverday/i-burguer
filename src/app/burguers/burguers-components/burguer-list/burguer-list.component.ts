import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Burguer } from '../../interfaces/burguer';

@Component({
  selector: 'burguer-list',
  templateUrl: './burguer-list.component.html',
  styleUrls: ['./burguer-list.component.scss']
})
export class BurguerListComponent implements OnInit {
  @Input() burguers: Burguer[];
  @Output() paginationChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onToggleChange = (burguer: Burguer): void => this.burguers.filter(item => item.id !== burguer.id).forEach(burguer => burguer.isExpanded = false)
}
