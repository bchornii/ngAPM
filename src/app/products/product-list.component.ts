import { Component, OnInit } from '@angular/core';
import { IProduct } from '../models/product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  showImg = false;

  private _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter
        ? this.performFilter(this.listFilter)
        : this.products;
  }

  filteredProducts: IProduct[];
  products: IProduct[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => console.log(err)
    });
  }

  toggleImg(): void {
    this.showImg = !this.showImg;
  }

  performFilter(filter: string): IProduct[] {
    filter = filter.toLocaleLowerCase();
    return this.products.filter((p: IProduct) =>
        p.productName.toLocaleLowerCase().indexOf(filter) !== -1);
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }
}
