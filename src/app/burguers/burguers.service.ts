import { Injectable } from '@angular/core';
import { Burguer } from './interfaces/burguer';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { config } from '../../config';
import { Storage } from '@ionic/storage';

const FILTER_KEY = 'burguerFilter'

@Injectable()
export class BurguersService {
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    baseUrl: string = config.getApiAddress() + '/api/burguers';

    constructor(private http: HttpClient, private storage: Storage) { }

    getBurguers(filter?: any, page?: number, pageSize?: number): Observable<Burguer[]> {
        const urlEncoded = config.urlencode({ ...filter, page, pageSize });
        const queryString = urlEncoded != "" ? `?${urlEncoded}` : '';
        let url = this.baseUrl + queryString;
        return this.http.get<Burguer[]>(url, this.httpOptions);
    }

    setFilter(filter: any): Promise<void> {
        return this.storage.set(FILTER_KEY, { ...filter });
    }

    getFilter(): Promise<any> {
        return this.storage.get(FILTER_KEY);
    }

    removeFilter(): Promise<void> {
        return this.storage.remove(FILTER_KEY);
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
                const filter = await this.service.getFilter();
                this.service.getBurguers(filter)
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
