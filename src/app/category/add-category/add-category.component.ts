import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor() { }
  category: any = {
    nom: '',
    qte: ''
  }
  ngOnInit(): void {
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
