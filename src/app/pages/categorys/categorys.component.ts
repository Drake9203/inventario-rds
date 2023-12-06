import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryComponent } from './modal/category/category.component';
import { ICategory, IProduct, PaginationInfo, paramRequest } from '../../models/model';
import * as moment from 'moment';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { CategorysService } from './categorys.service';
import * as uuid from 'uuid';
import { CustomMessageAlert } from '../../utils/customMessageAlert';
import * as _ from 'lodash';
import { ProductComponent } from '../products-by-category/modal/product/product.component';
import { ProductService } from '../products-by-category/product.service';
@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.css']
})


export class CategorysComponent {
  dataCategory!: ICategory[]
  dataCategoryTemp!: ICategory[]
  moment: any = moment;
  dataPerPage: number = 5;
  isDesc: boolean = false;
  column: any = 'name';
  isBusy: boolean = false;
  paginationInfo: PaginationInfo = {
    totalRecords: 0,
    page: 1,
    pageSize: 5
  }
  params: paramRequest = {
    skip: 0,
    take: this.paginationInfo.pageSize,
    searchTerm: ''
  }
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private categorysService: CategorysService,
    private productService: ProductService,
    private customMessageAlert:CustomMessageAlert
  ) {
    this.getData()
  }

  getData() {
    this.categorysService.getCategorys().subscribe((resp: ICategory[]) => {
      if(resp.length > 0){
        this.dataCategory = resp
        this.paginationInfo.totalRecords = resp.length;
      }
    })
  }
  openModal(data?: ICategory) {
    const modalRef = this.modalService.open(CategoryComponent, {
      centered: true,
      windowClass: 'modal-holder',
    });
    modalRef.componentInstance.model = data;
    modalRef.componentInstance.onCancel.subscribe(() => modalRef.close());
    modalRef.componentInstance.onSave.subscribe((category: ICategory) => {
      modalRef.close();
      
      if (category.id) {
        this.categorysService.editCategory(category).subscribe((resp) => {
        })
        
      } else {
        category.date = moment().format('YYYY-MM-DD');
        category.id = uuid.v4()
        this.categorysService.createCategory(category).subscribe((resp) => {
        })
      }
      this.getData()
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

  onChangePageSize(dataPerPage: number) {
    console.log(dataPerPage, "dataPerPage");
    this.paginationInfo.pageSize = dataPerPage;
    console.log(this.paginationInfo.pageSize, "this.paginationInfo.pageSize");
  }

  sort(property: string | number) {
    this.isDesc = !this.isDesc;
    this.column = property;
    if (this.isDesc) {
      this.dataCategory = _.orderBy(this.dataCategory, [property], "desc");
    } else {
      this.dataCategory = _.orderBy(this.dataCategory, [property], "asc");
    }
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
        this.categorysService.deteleCategory(category.id!).subscribe( catDelte => {
          this.customMessageAlert.actionMsg('Registro eliminado', "OK!!", 'success');
        },()=>{
          this.customMessageAlert.actionMsg('Error al eliminar el registro',"ERROR!!","warning");
        },() => {
          this.getData();
        })
      }
    });
  }

  goTo(id:string){
    this.router.navigate(['category/' + id]);
  }

  onAddProduct(idCategory:string){
    const modalRef = this.modalService.open(ProductComponent, {
      centered: true,
      windowClass: 'modal-holder',
    });
    modalRef.componentInstance.idCategory = idCategory;
    modalRef.componentInstance.onCancel.subscribe(() => modalRef.close());
    modalRef.componentInstance.onSave.subscribe((product: IProduct) => {
      console.log(product, "product");
      modalRef.close();
      if (product.id) {
        
      } else {
        product.id = uuid.v4()
        product.date = moment().format('YYYY-MM-DD');
        this.productService.createProduct(product).subscribe((resp) => {
        })
      }
      this.getData()
    });
  }
}
