import { Injectable, signal } from '@angular/core';
import { Product } from '../dto/product.dto';
import { ProductApiResponse } from '../dto/product-api-response.dto';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly API_URL = 'https://dummyjson.com/products';
  private limit=12;
  
  private productsResource = signal<{
    data: Product[];
    loading: boolean;
    error: string | null;
    allLoaded: boolean;
  }>({
    data: [],
    loading: false,
    error: null,
    allLoaded: false
  });

  public readonly productsState = this.productsResource.asReadonly();

  constructor() {
    this.loadMoreProducts();
  }

  async loadMoreProducts(): Promise<void> {
    const currentState = this.productsResource();
    
    if (currentState.loading || currentState.allLoaded) {
      return;
    }

    this.productsResource.update(state => ({
      ...state,
      loading: true,
      error: null
    }));

    try {
      const skip = currentState.data.length;
      const response = await fetch(`${this.API_URL}?limit=${this.limit}&skip=${skip}`);
      const newData: ProductApiResponse = await response.json();
      
      const allProducts = [...currentState.data, ...newData.products];
      const allLoaded = allProducts.length >= newData.total;
      
      this.productsResource.set({
        data: allProducts,
        loading: false,
        error: null,
        allLoaded: allLoaded
      });
    } catch (error) {
      this.productsResource.update(state => ({
        ...state,
        loading: false,
        error: 'Failed to load products'
      }));
    }
  }
}