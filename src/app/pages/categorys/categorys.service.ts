import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory, IProduct } from '../../models/model';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs';
import httpHandlePrivateError from '../../utils/httpHandlePrivateError';

@Injectable({
  providedIn: 'root'
})
export class CategorysService {
  URL: string;
  constructor(private http: HttpClient) {
    this.URL = `${environment.LOCAL}`;
  }


  getCategorys() {
    let url = new URL(`${this.URL}category`);
    return this.http
      .get<ICategory[]>(url.toString())
      .pipe(
        catchError((error: HttpErrorResponse) => httpHandlePrivateError(error))
      );
  }

  createCategory(category: ICategory) {
    return this.http.post(`${this.URL}category`, category);
  }

  deteleCategory(categoryId: string) {
    return this.http.delete(`${this.URL}category/${categoryId}`).pipe(
      catchError((error: HttpErrorResponse) => httpHandlePrivateError(error))
    );
  }

  getCategoryById(categoryId: string) {
    let url = new URL(`${this.URL}categoryById/${categoryId}`);
    return this.http
      .get<ICategory>(url.toString())
      .pipe(
        catchError((error: HttpErrorResponse) => httpHandlePrivateError(error))
      );
  }

}
