import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product:any={};
  id;

  constructor(
    private categoryService: CategoryService, 
    private productService: ProductService, 
    private route: ActivatedRoute,
    private router: Router) {

    this.categories$ = categoryService.getCategories();
    
    this.id = this.route.snapshot.paramMap.get('id'); //get id of a producs
    
    if (this.id) this.productService.get(this.id).valueChanges().pipe(
      take(1)).subscribe(p => this.product = p); //get product from firebase
  }

  save(product: any){
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  delete(){
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit(): void {
  }
}
