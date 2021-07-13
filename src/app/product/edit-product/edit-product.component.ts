import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CategoryService } from 'src/app/services/category.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private CategoryService: CategoryService, private productService: ProductService) { }

  product: any;
  categories: any[];
  isReady = false;
  ngOnInit(): void {
    if (this.data) {
      this.productService.getById(this.data.id).subscribe(response => {
        this.product = response
        this.getAllCategories()
      })
    }
  }
  requiredValidator = new FormControl('', [
    Validators.required,
  ]);
  requiredCatValidator = new FormControl('', [
    Validators.required,
  ]);
  minQte = new FormControl('', [
    Validators.required,
    Validators.min(0)
  ]);
  getAllCategories() {
    this.isReady = false
    this.CategoryService.getAll()
      .subscribe(
        data => {
          this.categories = data;
          this.isReady = true;
        },
        error => {
          console.log(error);
        });

  }
  check() {
    if (this.requiredValidator.valid && this.minQte.valid && this.requiredCatValidator)
      return this.product;
    return false
  }
  isvalidated() {
    if (this.requiredValidator.status == 'INVALID')
      return true;
    if (this.minQte.status == 'INVALID')
      return true;
    if (this.requiredCatValidator.status == 'INVALID')
      return true;
    return false;
  }
  matcher = new MyErrorStateMatcher();
}