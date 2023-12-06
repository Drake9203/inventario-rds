import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { ICategory } from '../models/model';
import * as _ from 'lodash';

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
            if (request.url.endsWith('/category') && request.method === 'GET') {
                console.log("category fake");
                return of(new HttpResponse({ status: 200, body: categorys }));
            }

            if (request.url.includes('/categoryById') && request.method === 'GET') {
                console.log("categoryById fake");
                const urlParts = request.url.split('/');
                const idCategory = urlParts[urlParts.length - 1];
                let category
                // validation
                if (categorys) {
                    category = categorys.filter((category: any) => category.id === idCategory);
                    if (!category) {
                        return throwError({ error: { message: 'Categoria "' + idCategory + '" no Existe' } });
                    }
                }
                return of(new HttpResponse({ status: 200, body: category![0] }));
            }

            if (request.url.includes('/category') && request.method === 'POST') {
                // get new category object from post body
                const newCategory = request.body;
                // validation
                if (categorys) {
                    const duplicateCategory = categorys.filter((category: any) => category.name === newCategory.name).length;
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
                    const idExists = categorys.filter((category: any) => category.id === idCategory).length;
                    console.log(idExists, "idExists");
                    if (!idExists) {
                        return throwError({ error: { message: 'Categoria "' + idCategory + '" no Existe' } });
                    }
                }
                // categorys = categorys.filter((category: any) => category.id !== idCategory)
                categorys = _.reject(categorys, category => category.id === idCategory);
                localStorage.setItem('categorys', JSON.stringify(categorys));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            if (request.url.includes('/product') && request.method === 'POST') {
                const newProduct = request.body;
                const existsCategory = categorys.filter((category: any) => category.id === newProduct.idCategory).length;
                if (existsCategory) {
                    categorys.forEach((category: ICategory) => {
                        if (category.id === newProduct.idCategory) {
                            if (!category.products) category.products = []
                            category.products.push(newProduct)
                        }
                    });
                } else {
                    return throwError({ error: { message: 'Categoria no Existe' } });
                }
                localStorage.setItem('categorys', JSON.stringify(categorys));
                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            if (request.url.includes('/product') && request.method === 'DELETE') {

                const urlParts = request.url.split('/');
                const idCategory = urlParts[urlParts.length - 2];
                const idProduct = urlParts[urlParts.length - 1];

                // validation
                if (categorys) {
                    const existsCategory: ICategory[] = categorys.filter((category: any) => category.id === idCategory);
                    if (!existsCategory) {
                        return throwError({ error: { message: 'Categoria "' + idCategory + '" no Existe' } });
                    } else {
                        const existsProduct = existsCategory![0].products?.filter((product: any) => product.id === idProduct);
                        if (!existsProduct) {
                            return throwError({ error: { message: 'Producto "' + idProduct + '" no Existe' } });
                        } else {
                            let productsTemp:any = []
                            categorys.map( category => {
                                    if(category.id === idCategory){
                                        category.products?.map(product =>{
                                            if(product.id !== idProduct){
                                                productsTemp.push(product)
                                            } 
                                        })
                                        delete category.products
                                        category.products = productsTemp
                                    }
                                    return category
                            })
                        }
                    }
                }
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
