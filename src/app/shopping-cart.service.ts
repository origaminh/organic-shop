import { Product } from './models/product';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { 

  }
  addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }
  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object<any>('/shopping-carts/' + cartId).valueChanges()
      .pipe(
        map(a => new ShoppingCart(a.items) )
      );  //Map to ShoppingCart object to assign returned objects ShoppingCart class
    // return GetFireObject( this.db.object('/shopping-carts/' + cartId) );
  }
  sharedCart: ShoppingCart;


  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }
  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }
  private async getOrCreateCartId(): Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }
  private async updateItemQuantity(product: Product, change: number){
    let cartId = await this.getOrCreateCartId();
    let itemF$ = this.getItem(cartId, product.key);
    itemF$.valueChanges().pipe(take(1)).subscribe((item: any) => {
      let quantity = (item && item.quantity || 0) + change;
      if (quantity === 0) itemF$.remove();
      else itemF$.update({ 
        product: product, 
        quantity: quantity
      });
    });
  }
}
