import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Product } from './models/product';
import { take,map,switchMap  } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';


@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {
  
  constructor(private db: AngularFireDatabase) { }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object("/shopping-carts/" + cartId).valueChanges().pipe(map((x: ShoppingCart) => new ShoppingCart((x as any).items)));
  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
      
  }

  async addToCart(product: Product){
    this.updateItem(product, +1);
  }

  async removeFromCart(product: Product){
    this.updateItem(product, -1);
  }

  private async updateItem(product: Product, change: number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);

    item$.snapshotChanges().pipe(take(1)).subscribe(item => {

      if (item.payload.exists()) {
        item$.update({     
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: (item.payload.exportVal().quantity || 0) + change});
      } else {
        item$.set({     
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: 1});
      }      
    });
  }
}
