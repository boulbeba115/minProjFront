import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CategoryService } from 'src/app/services/category.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private CategoryService: CategoryService) { }
  product: any = {
    nom: '',
    qte: '',
    disponible: true,
    category: {
      id: ''
    }
  }
  categories: any[];
  isReady = false;
  ngOnInit(): void {
    this.getAllCategories()
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
