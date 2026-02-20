import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, of, tap, throwError} from "rxjs";
import {Product} from "./product";
import {ProductData} from "./product-data";
import {HttpErrorService} from "../utilities/http-error.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl = 'api/productss';

  private http = inject(HttpClient);
  private errorService = inject(HttpErrorService);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(() => console.log('in http.get pipeline fetching products')),
        catchError(err => this.handleError(err))
      );
  }

  getProduct(id: number): Observable<Product> {
    const productUrl = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(productUrl)
      .pipe(
        tap(() => console.log(`in http.get pipeline fetching product ${id}`))
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(this.errorService.formatError(err));
  }
}
