import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$;
  category;
  constructor(
    route: ActivatedRoute,
    productService: ProductService, 
    categoryService: CategoryService
  ) { 
    productService
      .getAll().pipe(
        switchMap(products => {
          this.products = products;
          return route.queryParamMap;
        })
      ).subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      });
    
    this.categories$ = categoryService.getAll();
    
  }

  ngOnInit() {
  }

}
