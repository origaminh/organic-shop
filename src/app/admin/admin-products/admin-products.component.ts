import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  // products$;
  // Due to filtering products data, products$ Observable is no longer used
  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;
  constructor(private productService: ProductService) { 
    this.subscription = this.productService.getAll().subscribe
    (products => this.filteredProducts = this.products = products);
  }

  filter(query: string) {
    this.filteredProducts = (query) ? 
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
