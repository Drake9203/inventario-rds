import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { CategorysComponent } from './categorys/categorys.component';
import { CategoryComponent } from './categorys/modal/category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsByCategoryComponent } from './products-by-category/products-by-category.component';
import { ProductComponent } from './products-by-category/modal/product/product.component';

@NgModule({
  declarations: [
    CategorysComponent,
    CategoryComponent,
    ProductsByCategoryComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,  
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class PagesModule { }
