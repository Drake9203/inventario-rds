import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { CategorysComponent } from './categorys/categorys.component';
import { CategoryComponent } from './categorys/modal/category/category.component';

@NgModule({
  declarations: [
    CategorysComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
