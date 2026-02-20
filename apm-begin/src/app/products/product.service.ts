import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {Product} from "./product";
import {ProductData} from "./product-data";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl = 'api/productss';

  private http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(() => console.log('in http.get pipeline fetching products')),
        catchError(err => {
          console.error(err);
          return of(ProductData.products)
        })
      );
  }

  getProduct(id: number): Observable<Product> {
    const productUrl = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(productUrl)
      .pipe(
        tap(() => console.log(`in http.get pipeline fetching product ${id}`))
      );
  }
}
