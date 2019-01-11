import { Injectable } from '@angular/core';
import { Burguer } from './interfaces/burguer';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { config } from '../../config';

@Injectable()
export class BurguersService {
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    baseUrl: string = config.getApiAddress() + '/api/burguers';


    constructor(private http: HttpClient) { }

    getBurguers(filter?: string): Observable<Burguer[]> {
        const urlEncoded = config.urlencode({ filter });
        const queryString = urlEncoded != "" ? `?${urlEncoded}` : '';
        let url = this.baseUrl + queryString;
        return this.http.get<Burguer[]>(url, this.httpOptions);
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
