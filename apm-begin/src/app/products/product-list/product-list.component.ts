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

  private productService = inject(ProductService);

  products = this.productService.products;
  errorMessage = this.productService.productsError;

  selectedProductId = this.productService.selectedProductId;

  onSelected(productId: number): void {
    this.productService.productSelected(productId);
  }
}
