import { Component, inject } from '@angular/core';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
})
export class ProductsComponent {
  private productService = inject(ProductService);
  
  productsState = this.productService.productsState;

  loadMoreProducts(): void {
    this.productService.loadMoreProducts();
  }
}