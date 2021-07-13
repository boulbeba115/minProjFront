import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CategoryService } from 'src/app/services/category.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private categoryService: CategoryService) { }
  category: Category = {
    nom: '',
    qte: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  isReady: boolean = false
  ngOnInit(): void {
    if (this.data) {
      this.categoryService.getById(this.data.id).subscribe(response => {
        this.category = response
        this.isReady = true
      })
    }
  }
  requiredValidator = new FormControl('', [
    Validators.required,
  ]);
  minQte = new FormControl('', [
    Validators.required,
    Validators.min(0)
  ]);
  check() {
    if (this.requiredValidator.valid && this.minQte.valid)
      return this.category;
    return false
  }
  isvalidated() {
    if (this.requiredValidator.status == 'INVALID')
      return true;
    if (this.minQte.status == 'INVALID')
      return true;
    return false;
  }
  matcher = new MyErrorStateMatcher();
}
