import { Injectable } from '@angular/core';
import { Burguer } from './interfaces/burguer';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Platform } from '@ionic/angular';

@Injectable()
export class BurguersService {
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    baseUrl: string = '/api/burguers';

    constructor(private http: HttpClient, private platform: Platform) { }

    getBurguers(): Observable<Burguer[]> {
        if (!this.platform.is('desktop')) {
            this.baseUrl = 'http://192.168.1.5:3000/api/burguers';
        }
        return this.http.get<Burguer[]>(this.baseUrl, this.httpOptions);
    }

    addBurguer(burguer: Burguer): Observable<Burguer> {        
        return this.http.post(this.baseUrl, burguer, this.httpOptions);
    }
}

@Injectable()
export class BurguersResolver implements Resolve<Burguer[]> {

    constructor(private service: BurguersService) {

    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<Burguer[]> {
        return new Promise(async (resolve, reject) => {
            try {
                this.service.getBurguers()
                    .pipe(catchError(e => { throw (e) }))
                    .subscribe(response => {
                        resolve(response)
                    })
            } catch (e) {
                reject(e);
            }
        })
    }
}

@Injectable()
export class BurguerEmitterService {

    private cartAddedCount = new Subject<void>();
    cartAddedCount$ = this.cartAddedCount.asObservable();

    onCartAddedCount = (): void => this.cartAddedCount.next();
}
