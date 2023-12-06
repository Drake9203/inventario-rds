import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICategory, IProduct, PaginationInfo, paramRequest } from '../../models/model';
import * as moment from 'moment';
import * as _ from 'lodash';
import * as uuid from 'uuid';
import { CategorysService } from '../categorys/categorys.service';
import { ProductComponent } from './modal/product/product.component';
import { ProductService } from './product.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { CustomMessageAlert } from '../../utils/customMessageAlert';
@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.css']
})

export class ProductsByCategoryComponent {
  title!: string
  categoryId!: string
  dataProducts!: IProduct[]
  dataProductTemp!: IProduct[]
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
    private categorysService: CategorysService,
    private productService: ProductService,
    private routeParams: ActivatedRoute,
    private customMessageAlert: CustomMessageAlert
  ) {
    this.categoryId = this.routeParams.snapshot.paramMap.get('id') as string;

    if (this.categoryId) {
      this.getData()
    }
  }

  getData() {
    this.categorysService.getCategoryById(this.categoryId).subscribe((resp: ICategory) => {
      this.dataProducts = _.orderBy(resp.products, "name", "asc");
      this.title = resp.name
      this.paginationInfo.totalRecords = this.dataProducts.length;
    })
  }
  openModal(product?: IProduct) {
    const modalRef = this.modalService.open(ProductComponent, {
      centered: true,
      windowClass: 'modal-holder',
    });
    modalRef.componentInstance.product = product;
    modalRef.componentInstance.onCancel.subscribe(() => modalRef.close());
    modalRef.componentInstance.onSave.subscribe((product: IProduct) => {
      modalRef.close();
      if (product.id) {
        this.productService.editProduct(product).subscribe((resp) => {
          this.customMessageAlert.actionMsg('Registro guardado', "OK!!", 'success');
        }, () => {
          this.customMessageAlert.actionMsg('Error al editar el registro', "ERROR!!", "warning");
        }, () => {
        })
      } else {
        product.id = uuid.v4()
        product.date = moment().format('YYYY-MM-DD');
        product.idCategory = this.categoryId
        this.productService.createProduct(product).subscribe((resp) => {
          this.customMessageAlert.actionMsg('Registro creado', "OK!!", 'success');
        }, () => {
          this.customMessageAlert.actionMsg('Error al crear el registro', "ERROR!!", "warning");
        }, () => {
        }
        )
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

  onDelete(product: IProduct): void {

    this.onDeleteMessage("Desea eliminar el producto?", product);

  }

  onDeleteMessage(message: string, product: IProduct) {
    this.dataProductTemp = [...this.dataProducts]
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
        this.productService.deteleProduct(this.categoryId, product.id!).subscribe(catDelte => {
          this.customMessageAlert.actionMsg('Registro eliminado', "OK!!", 'success');
        }, () => {
          this.customMessageAlert.actionMsg('Error al eliminar el registro', "ERROR!!", "warning");
        }, () => {
          this.getData();
        })
      }
    });
  }
}
