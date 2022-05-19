import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';  

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  aflProducts: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }

  create(product:any){
    return this.db.list('/products').push(product);
  }

  getAll(){
    this.aflProducts = this.db.list('/products');
     return this.aflProducts
     .snapshotChanges()
     .pipe(map(changes => changes
     .map(c => ({ key: c.payload.key, ...c.payload.val() }))));
  }

  get(productId: any){
    return this.db.object('/products/' + productId);
  }

  update(productId: any, product: object){
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: any){
    return this.db.object('/products/' + productId).remove();
  }
}
