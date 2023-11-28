import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { CategorysComponent } from './categorys/categorys.component';
import { CategoryComponent } from './categorys/modal/category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    CategorysComponent,
    CategoryComponent
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
