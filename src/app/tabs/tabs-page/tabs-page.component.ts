import { Component, OnInit } from '@angular/core';
import { BurguerEmitterService } from '../../burguers/burguers.service';
import { Subscription } from 'rxjs';
import { CartEmitterService } from '../../cart/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabs-page',
  templateUrl: './tabs-page.component.html',
  styleUrls: ['./tabs-page.component.scss'],
  providers: [BurguerEmitterService, CartEmitterService]
})
export class TabsPageComponent implements OnInit {
  public cartCount: number = 0;
  private cartAddedSub: Subscription;
  private cartCountSub: Subscription;

  constructor(private burguerEmitter: BurguerEmitterService, private cartEmitter: CartEmitterService, private route: ActivatedRoute) {
     this.cartAddedSub = this.burguerEmitter.cartAddedCount$.subscribe(this.onCartAddedCount)
     this.cartCountSub = this.cartEmitter.handleCartCount$.subscribe(this.handleCartCount)
     this.cartCount = this.route.snapshot.data.cartCount;
  }

  ngOnInit() {

  }

  private onCartAddedCount = (): void => {
    this.cartCount++;
  }

  private handleCartCount = (count: number): void => {
    if (count !== this.cartCount)
      this.cartCount = count;
  }

  ngOnDestroy() {
    this.cartAddedSub.unsubscribe();
    this.cartCountSub.unsubscribe();
  }
}
