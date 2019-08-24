import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: IProduct;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `${id}`;
    this.product = {} as IProduct;
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

}
