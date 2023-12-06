import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../../../../models/model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product!: IProduct;
  @Output() onCancel: EventEmitter<void> = new EventEmitter();
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  submit!: boolean;
  isEdit: boolean = true;
  title!: string
  validatorRequired = Validators.required;
  validationform: FormGroup = this.fb.group({
    name: ['', [this.validatorRequired]],
    price: ['', [this.validatorRequired]],
    description: ['', [this.validatorRequired]],
    img: ['']
  });


  constructor(public fb: FormBuilder){

  }

  ngOnInit(): void {
    this.title = 'EDITAR'
    if (!this.product) {
      this.title = 'CREAR'
      this.isEdit = false;
      this.product = {
        name: '',
        price: 0,
        date: '',
        description: '',
        img: '',
      }
    }
  }

  onClose() {
    this.onCancel.emit();
  }

  get form() {
    return this.validationform.controls;
  }

  onSubmit() {
    this.submit = true;
    if (!this.validationform.valid) return;
    let objProduct = this.validationform.value;
    if(this.isEdit){
      objProduct.idCategory = this.product.idCategory
      objProduct.date = this.product.date
      objProduct.id = this.product.id
    }
    this.onSave.emit(objProduct);
  }
}
