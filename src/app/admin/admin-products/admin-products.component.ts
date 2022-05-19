import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;
  key:string = 'title';
  p: number = 1;
  reverse: boolean = false;

  constructor(private producsService: ProductService) {
    this.subscription = this.producsService.getAll().subscribe(products => this.filteredProducts = this.products = products);
  }

  filter(query: string){
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

}
