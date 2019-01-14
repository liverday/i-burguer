import { Category } from '../categories/interfaces/category';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { config } from '../../config';

@Injectable()
export class CategoryService {
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    baseUrl: string = config.getApiAddress() + '/api/categories';

    constructor(private http: HttpClient) { }

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.baseUrl, this.httpOptions);
    }
}

@Injectable()
export class CategoriesResolver implements Resolve<Category[]> {

    constructor(private service: CategoryService) { }

    resolve(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): Promise<Category[]> {
        return new Promise(async (resolve, reject) => {
            try {
                this.service.getCategories()
                    .pipe(catchError(e => { throw e }))
                    .subscribe(response => resolve(response))
            } catch (e) {
                reject(e);
            }
        })
    }
}