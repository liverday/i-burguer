import { Injectable } from '@angular/core';
import { Burguer } from './interfaces/burguer';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BurguersService {
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    baseUrl: string = 'http://localhost:3000/burguers';

    constructor(private http: HttpClient) { }

    getBurguers(): Observable<Burguer[]> {
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