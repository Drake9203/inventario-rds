import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as uuid from 'uuid';
import { ICategory } from '../../../../models/model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  @Input() model!: ICategory;
  @Output() onCancel: EventEmitter<void> = new EventEmitter();
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  submit!: boolean;
  isEdit: boolean = true;
  validatorRequired = Validators.required;
  validationform: FormGroup =this.fb.group({
    id: [''],
    name: ['', [this.validatorRequired]],
    date: ['', [this.validatorRequired]],
    description: ['', [this.validatorRequired]],
    img: ['', [this.validatorRequired]]
  });
  constructor(public fb: FormBuilder) {

    if (!this.model) {
      this.isEdit = false;
      this.model = {
        id: '',
        name: '',
        date: '',
        description: '',
        img: '',
        count:0
      }
    }

  }

  // get form() {
  //   return this.validationform.controls;
  // }
  get form(): { [key: string]: AbstractControl; } {
    return this.validationform.controls;
}

  onClose() {
    this.onCancel.emit();
  }

  onSubmit() {
    console.log(this.isEdit, "this.isEdit");
    console.log(this.validationform.value, "this.validationform.valid");
    this.submit = true;
    if (!this.validationform.valid) return;
    let objCategory = this.validationform.value;
    if (!!this.isEdit) {
      objCategory.id = this.model.id;
    }
    console.log(objCategory, "objCategory");
    this.onSave.emit(objCategory);
  }
}
