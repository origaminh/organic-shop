import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { map } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-shopping-carts',
  templateUrl: './view-shopping-carts.component.html',
  styleUrls: ['./view-shopping-carts.component.css']
})
export class ViewShoppingCartsComponent implements OnDestroy {

  shoppingCarts$;
  shoppingCarts;
  subscription: Subscription;
  constructor(
    private shoppingCartService: ShoppingCartService,
    private db: AngularFireDatabase) { 
    this.subscription = this.db.list('/shopping-carts').snapshotChanges().pipe(
      map(actions => actions.map(a => 
        (Object.assign({}, {key: a.key}, a.payload.val()))
      ))
    ).subscribe(carts => {
      this.shoppingCarts = carts;
    });
  }

  deleteAllShoppingCarts() {
    this.db.list('/shopping-carts').remove().then(res => {
      window.location.href = '/';
    })
  }
  getItemsCount(cart){
    if(!cart.items) return 0;
    let sum = 0;
    for(var key in cart.items){
      sum += cart.items[key].quantity;
    }
    return sum;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
