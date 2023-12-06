import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory, IProduct } from '../../models/model';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs';
import httpHandlePrivateError from '../../utils/httpHandlePrivateError';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  URL: string;
  constructor(private http: HttpClient) {
    this.URL = `${environment.LOCAL}`;
  }

  createProduct(product: IProduct) {
    return this.http.post(`${this.URL}product`, product);
  }

  deteleProduct(categoryId:string, productId: string) {
    console.log(categoryId, "categoryId SS");
    console.log(productId, "productId SS");
    return this.http.delete(`${this.URL}product/${categoryId}/${productId}`).pipe(
      catchError((error: HttpErrorResponse) => httpHandlePrivateError(error))
    );
  }

}
