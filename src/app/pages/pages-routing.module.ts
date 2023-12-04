import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorysComponent } from './categorys/categorys.component';
import { ProductsByCategoryComponent } from './products-by-category/products-by-category.component';


const routes: Routes = [
  {
    path: 'categorys',
    component: CategorysComponent
  },
  {
    path: 'category/:id',
    component: ProductsByCategoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
