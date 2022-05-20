import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{

  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;

  products: Product[] = [];
  filteredProducts: Product[];
  categories$;
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService, 
    
    private cartService: ShoppingCartService) {

    productService
      .getAll().subscribe(products => {
      this.products = products;

      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
  
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) : 
          this.products;
      });
    });

    
  }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).snapshotChanges().subscribe(cart => this.cart = cart); 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addToCart(product: Product){
    this.cartService.addToCart(product);
  }

  getQuantity(){
    if(!this.shoppingCart) return 0;
    let item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0 ;
  }

}
