import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { AddCategoryComponent } from './add-category/add-category.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditCategoryComponent } from './edit-category/edit-category.component';

@NgModule({
  declarations: [
    ListCategoriesComponent,
    AddCategoryComponent,
    EditCategoryComponent
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
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  exports: [
  ]
})
export class CategoryModule {

}
