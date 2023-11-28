import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryComponent } from './modal/category/category.component';

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.css']
})
export interface IProduct{
  name:string,
  date:string,
  category:[]
}

export class CategorysComponent {
  dataCategory!:IProduct
  constructor(
    private modalService: NgbModal,
    private router: Router
  ) {}


  openModal(){
    const modalRef = this.modalService.open(CategoryComponent, {
      centered: true,
      windowClass: 'modal-holder',
    });
    modalRef.componentInstance.model = dataCategory;
    modalRef.componentInstance.onCancel.subscribe(() => modalRef.close());
    modalRef.componentInstance.onSave.subscribe((user: any) => {
      modalRef.close();
      if (user.id) {
        this.suscriptionsService.editUser(user).subscribe((resp) => {
          if(resp){
            this.customMessageAlert.actionMsg('Registro guardado', "OK!!", 'success');
          }
        },
        (error) => {
          this.customMessageAlert.actionMsg('Ocurrió un error al consultar los usuarios', 'Ups!!', 'error')
        },
        () => {
          this.isBusy = false;
          this.fetchData();
        });
      }
    });
  }
}
