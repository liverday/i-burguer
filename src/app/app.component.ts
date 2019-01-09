import { Component, NgZone, Renderer, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, RouterEvent, NavigationStart, NavigationCancel, NavigationError, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('spinnerElement') spinnerElement: ElementRef;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private ngZone: NgZone,
    private renderer: Renderer,
  ) {
    this.router.events.subscribe((event: RouterEvent) => this.navigationInterceptor(event))
    this.initializeApp();
  }

  private navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.ngZone.runOutsideAngular(() => {
        this.renderer.setElementStyle(
          this.spinnerElement.nativeElement,
          'display',
          'block'
        )
      });
    }
    if (event instanceof NavigationCancel) {
      this._hideSpinner();
    }
    if (event instanceof NavigationError) {
      this._hideSpinner();
    }

    if (event instanceof NavigationEnd) {
      this._hideSpinner();
    }

  }

  private _hideSpinner(): void {
    this.ngZone.runOutsideAngular(() => {
      this.renderer.setElementStyle(
        this.spinnerElement.nativeElement,
        'display',
        'none'
      )
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
        this.splashScreen.hide();
    });
  }
}
