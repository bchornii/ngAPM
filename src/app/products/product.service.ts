import { Injectable } from '@angular/core';
import { IProduct } from '../models/product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = 'api/products/products.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errMessage: string;

    if (err.error instanceof ErrorEvent) {
      errMessage = `An error occured: ${err.error.message}`;
    } else {
      errMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }

    console.log(errMessage);
    return throwError(errMessage);
  }
}
