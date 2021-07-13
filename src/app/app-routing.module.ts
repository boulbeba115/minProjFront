import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoriesComponent } from './category/list-categories/list-categories.component';
import { ProductListComponent } from './product/product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/category',
    pathMatch: 'full'
  },
  {
    path: 'category',
    component: ListCategoriesComponent
  },
  {
    path: 'product',
    component: ProductListComponent
  },
  {
    path: 'product/category/:id',
    component: ProductListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
