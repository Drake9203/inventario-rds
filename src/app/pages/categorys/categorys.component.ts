import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryComponent } from './modal/category/category.component';
import { ICategory, PaginationInfo, paramRequest } from '../../models/model';
import * as moment from 'moment';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { CategorysService } from './categorys.service';
@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.css']
})


export class CategorysComponent {
  dataCategory!:ICategory[]
  dataCategoryTemp!:ICategory[]
  moment: any = moment;
  dataPerPage: number = 20;
  isDesc: boolean = false;
  column: any = 'name';
  isBusy: boolean = false;
  paginationInfo: PaginationInfo = {
    totalRecords: 0,
    page: 1,
    pageSize: 20
  }
  params: paramRequest = {
    skip: 0,
    take: this.paginationInfo.pageSize,
    searchTerm: ''
  }
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private categorysService: CategorysService
  ) {
  this.getData()
  }

  getData(){
    console.log(22222222);
      this.categorysService.getCategorys().subscribe((resp:ICategory[]) => {
        this.dataCategory = resp
      })
  }
  openModal(data?:ICategory){
    const modalRef = this.modalService.open(CategoryComponent, {
      centered: true,
      windowClass: 'modal-holder',
    });
    modalRef.componentInstance.model = data;
    modalRef.componentInstance.onCancel.subscribe(() => modalRef.close());
    modalRef.componentInstance.onSave.subscribe((category: ICategory) => {
      modalRef.close();
    
    });
  }

  search() {
    if (this.params.searchTerm != '') {
      // this.params.companyOrNit = this.params.searchTerm
    }
  }

  clearData() {
    this.params = {
      skip: 0,
      take: this.paginationInfo.pageSize,
      searchTerm: ''
    }
  }

  selectPage(currentPage: number) {
    let skip = 0
    this.paginationInfo.page = currentPage
    if (currentPage !== 1) skip = (currentPage - 1) * (this.paginationInfo.pageSize + 1) - 2
    this.params.skip = skip
  }

  onChangePageSize(dataPerPage: any) {
    this.params.take = dataPerPage;
  }

  sort(property: string | number) {
    // this.isDesc = !this.isDesc;
    // this.column = property;
    // this.params.orderBy = this.column;
    // if (this.isDesc) {
    //   this.params.direction = 'DESC';
    // } else {
    //   this.params.direction = 'ASC';
    // }
    // this.fetchData(this.params);
  }

  onDelete(categorie: ICategory): void {

    this.onDeleteMessage("Desea eliminar la categoria?", categorie);

  }

  onDeleteMessage(message: string, category: ICategory) {
    this.dataCategoryTemp = [...this.dataCategory]
    Swal.fire({
      text: message,
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: 'rgb(3, 142, 220)',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: 'rgb(3, 142, 220)'
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.isConfirmed) {
        this.dataCategory = this.dataCategoryTemp.filter( c=> c.id !== category.id)
      }
    });
  }
}
