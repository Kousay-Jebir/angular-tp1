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

  private page$ = new BehaviorSubject<number>(0);

  products$: Observable<Product[]> = this.page$.pipe(
    concatMap((pageIndex) => {
      const settings: Settings = {
        limit: this.pageSize,
        skip: pageIndex * this.pageSize,
      };

      return this.productService
        .getProducts(settings)
        .pipe(map((response) => response.products));
    }),
    takeWhile((products) => products.length > 0),
    scan(
      (allProducts, newProducts) => [...allProducts, ...newProducts],
      [] as Product[]
    )
  );

  constructor(private productService: ProductService) {}

  loadMore(): void {
    if (!this.page$.closed) {
      this.page$.next(this.page$.value + 1);
    }
  }
}
