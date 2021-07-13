import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    ProductListComponent,
    AddProductComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  exports: [
  ]
})
export class ProductModule { }
