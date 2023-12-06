import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategory } from '../../../../models/model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent  implements OnInit{
  @Input() model!: ICategory;
  @Output() onCancel: EventEmitter<void> = new EventEmitter();
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  submit!: boolean;
  isEdit: boolean = true;
  title!: string
  validatorRequired = Validators.required;
  validationform: FormGroup = this.fb.group({
    name: ['', [this.validatorRequired]],
    description: ['', [this.validatorRequired]],
    img: ['']
  });
  constructor(public fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.title = 'EDITAR'
    console.log(this.model, "model");
    if (!this.model) {
      this.title = 'CREAR'
      this.isEdit = false;
      this.model = {
        id: '',
        name: '',
        date: '',
        description: '',
        img: '',
        products: []
      }
    }
  }

  get form() {
    return this.validationform.controls;
  }

  onClose() {
    this.onCancel.emit();
  }

  onSubmit() {
    this.submit = true;
    if (!this.validationform.valid) return;
    let objCategory = this.validationform.value;
    if (!!this.isEdit) {
      objCategory.id = this.model.id;
      objCategory.date = this.model.date;
    }
    this.onSave.emit(objCategory);
  }
}
