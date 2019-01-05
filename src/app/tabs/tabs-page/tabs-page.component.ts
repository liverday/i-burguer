import { Component, OnInit } from '@angular/core';
import { BurguerEmitterService } from '../../burguers/burguers.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tabs-page',
  templateUrl: './tabs-page.component.html',
  styleUrls: ['./tabs-page.component.scss'],
  providers: [BurguerEmitterService]
})
export class TabsPageComponent implements OnInit {
  public cartCount: number = 0;
  private subscription: Subscription;

  constructor(private burguerEmitter: BurguerEmitterService) {
    this.subscription = this.burguerEmitter.cartAddedCount$.subscribe(this.onCartAddedCount)
  }

  ngOnInit() {

  }

  private onCartAddedCount = (): void => {
    this.cartCount++;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
