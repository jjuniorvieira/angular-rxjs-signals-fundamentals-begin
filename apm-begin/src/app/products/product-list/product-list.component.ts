import {Component, inject} from '@angular/core';

import {AsyncPipe, NgClass, NgFor, NgIf} from '@angular/common';
import {Product} from '../product';
import {ProductDetailComponent} from '../product-detail/product-detail.component';
import {ProductService} from "../product.service";
import {catchError, EMPTY, tap} from "rxjs";

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, ProductDetailComponent, AsyncPipe]
})
export class ProductListComponent {
  pageTitle = 'Products';
  errorMessage = '';

  private productService = inject(ProductService);

  readonly products$ = this.productService.products$
    .pipe(
      tap(products => console.log('in tap pipeline fetching products')),
      catchError(error => {
        this.errorMessage = error
        return EMPTY;
      })
    );

  products: Product[] = [];

  // Selected product id to highlight the entry
  selectedProductId: number = 0;

  onSelected(productId: number): void {
    this.selectedProductId = productId;
  }
}
