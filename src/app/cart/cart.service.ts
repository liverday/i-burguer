import { Injectable } from '@angular/core';
import { Burguer } from '../burguers/interfaces/burguer';
import { Storage } from '@ionic/storage';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CartItem } from './interfaces/cart-item';
import { Subject } from 'rxjs';

const CART_KEY = 'cartItems'

@Injectable()
export class CartService {

    constructor(public storage: Storage) {

    }

    getCartItems = async (): Promise<CartItem[]> => {
        return this.storage.get(CART_KEY);
    }

    addToCart = async (item: CartItem): Promise<string> => {
        let cartItems: CartItem[] = await this.getCartItems();

        if (cartItems) {
            if (!this.containsItem(item, cartItems)) {
                cartItems = cartItems.concat([{ ...item, qtty: 1 }]);
                this.storage.set(CART_KEY, cartItems);
                return 'added';
            } else {
                let found = cartItems.find(item => item.id === item.id)

                if (!found.qtty)
                    found.qtty = 0;

                found.qtty++;
                this.storage.set(CART_KEY, cartItems);
                return 'updated';
            }
        } else {
            this.storage.set(CART_KEY, [{ ...item, qtty: 1 }]);
            return 'added';
        }
    }

    remove = async (item: CartItem): Promise<CartItem> => {
        let cartItems: CartItem[] = await this.getCartItems();

        if (cartItems) {
            cartItems = cartItems.filter(it => it.id !== item.id)
            return this.storage.set(CART_KEY, cartItems)
        }
    }

    removeAll = async (): Promise<any> => {
        return this.storage.remove(CART_KEY)
    }

    containsItem = (item: CartItem, arr: CartItem[]) => {
        if (!item)
            return false
        if (!arr.length)
            return false
        let found = arr.find(it => it.id === item.id)
        if (!found)
            return false;
        return true;
    }

    addQttyById = async (id: number): Promise<void> => {
        let cartItems = await this.getCartItems();
        let found = cartItems.find(it => it.id === id);
        if (found)
            found.qtty++;

        return this.storage.set(CART_KEY, cartItems);
    }

    decQttyById = async (id: number): Promise<void> => {
        let cartItems = await this.getCartItems();
        let found = cartItems.find(it => it.id === id);
        if (found)
            found.qtty--;

        return this.storage.set(CART_KEY, cartItems);
    }
}

@Injectable()
export class CartResolver implements Resolve<CartItem[]> {

    constructor(private service: CartService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<CartItem[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let cartItems = await this.service.getCartItems()
                if (!cartItems) resolve([]);

                resolve(cartItems);
            } catch (e) {
                reject(e)
            }
        });
    }
}

@Injectable()
export class CartCountResolver implements Resolve<number> {
    constructor(private service: CartService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<number> {
        return new Promise(async (resolve, reject) => {
            try {
                let cartItems = await this.service.getCartItems();
                if (!cartItems) resolve(0);

                resolve(cartItems.length);
            } catch (e) {
                reject(e);
            }
        });
    }
}

@Injectable()
export class CartEmitterService {
    private handleCartCount: Subject<number> = new Subject<number>();
    handleCartCount$ = this.handleCartCount.asObservable();

    onHandleCartCount = (count: number): void => {
        this.handleCartCount.next(count);
    }
}