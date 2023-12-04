import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { ICategory } from '../models/model';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const stringCategorys = localStorage.getItem('categorys');
        let categorys: ICategory[];
        if (stringCategorys) {
            categorys = JSON.parse(stringCategorys)
        } else {
            categorys = []
        }
        // tslint:disable-next-line: max-line-length
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // get categories
            if (request.url.includes('/category') && request.method === 'GET') {
                return of(new HttpResponse({ status: 200, body: categorys }));
            }

            if (request.url.includes('/category') && request.method === 'POST') {
                // get new category object from post body
                const newCategory = request.body;
                // validation
                if (categorys) {
                    const duplicateCategory = categorys.filter((category:any) => category.name === newCategory.name).length;
                   console.log(duplicateCategory, "duplicateCategory");
                    if (duplicateCategory) {
                        return throwError({ error: { message: 'Category "' + newCategory.name + '" is already' } });
                    }
                }
                categorys.push(newCategory)
                localStorage.setItem('categorys', JSON.stringify(categorys));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            if (request.url.includes('/category') && request.method === 'DELETE') {
                
                const urlParts = request.url.split('/');
                console.log(urlParts, "urlPartsurlParts");
                const idCategory = urlParts[urlParts.length - 1];
                // validation
                if (categorys) {
                    const idExists = categorys.filter((category:any) => category.id === idCategory).length;
                    console.log(idExists, "idExists");
                    if (!idExists) {
                        return throwError({ error: { message: 'Categoria "' + idCategory + '" no Existe' } });
                    }
                }
                categorys = categorys.filter((category:any) => category.id !== idCategory)
                localStorage.setItem('categorys', JSON.stringify(categorys));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // pass through any requests not handled above
            return next.handle(request);

        }))

            // tslint:disable-next-line: max-line-length
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
    }


    CATEGORY_MOCK = [

    ]

}
