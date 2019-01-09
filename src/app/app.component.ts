import { ShoppingCartService } from './shopping-cart.service';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private userService: UserService, 
    private auth: AuthService, router: Router, 
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
    ){
    auth.user$.subscribe(user => {
      if (user) {
        userService.save(user);

        let returnUrl = route.snapshot.queryParamMap.get('returnUrl');
        //let returnUrl = localStorage.getItem('returnUrl');
        //debugger;
        if (returnUrl) router.navigateByUrl(returnUrl);
      }
    })
  }

  cart;
  async ngOnInit() {
    (await this.shoppingCartService.getCart()).subscribe(cart => {
      this.cart = cart;
    });
  }
}
