import { Component } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  concatMap,
  map,
  takeWhile,
  scan,
} from 'rxjs';
import { Product } from './dto/product.dto';
import { ProductService } from './services/product.service';
import { Settings } from './dto/product-settings.dto';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  private readonly pageSize = 12;

  // Page index stream (0, 1, 2, ...)
  private page$ = new BehaviorSubject<number>(0);

  // Stream of all products to display
  products$: Observable<Product[]>;

  constructor(private productService: ProductService) {
    this.products$ = this.page$.pipe(
      // For each page index, call the API with limit/skip
      concatMap((pageIndex) => {
        const settings: Settings = {
          limit: this.pageSize,
          skip: pageIndex * this.pageSize,
        };

        return this.productService.getProducts(settings).pipe(
          // Map API response to list of products
          map((response) => response.products)
        );
      }),
      // Stop when API returns an empty list
      takeWhile((products) => products.length > 0),
      // Accumulate all batches into a single array
      scan(
        (allProducts, newProducts) => [...allProducts, ...newProducts],
        [] as Product[]
      )
    );
  }

  loadMore(): void {
    if (!this.page$.isStopped) {
      this.page$.next(this.page$.value + 1);
    }
  }
}
