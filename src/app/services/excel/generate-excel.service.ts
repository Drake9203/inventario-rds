import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})

export class GenerateExcelService {
    constructor() { }
    HeadsCategory: any = {
        name: {
            label: 'Nombre'
        },
        date: {
            label: 'Fecha de creación'
        },
        description: {
            label: 'Descripción'
        },
        img: {
            label: 'Imagen'
        },
        products: {
            label: 'Cantidad de productos'
        }

    }
    HeadsProducts: any = {
        name: {
            label: 'Nombre'
        },
        date: {
            label: 'Fecha de creación'
        },
        description: {
            label: 'Descripción'
        },
        img: {
            label: 'Imagen'
        },
        price: {
            label: 'Precio'
        },

    }
    exportDataExcel(data: any, name: string, isProduct: boolean) {
        let heads = isProduct ? this.HeadsProducts : this.HeadsCategory
        let dataExcel: any[] = []
        data.forEach((value: any) => {
            delete value.id
            if (value.idCategory) delete value.idCategory
            let newObj: any[] = []
            for (const iterator of _.keys(heads)) {
                newObj = _.merge(newObj, { [heads[iterator].label]: iterator === 'products' ? value[iterator].length : value[iterator] })
            }
            dataExcel.push(newObj)
        });
        try {
            let ws = XLSX.utils.json_to_sheet(dataExcel);
            const wb: XLSX.WorkBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, name);
            XLSX.writeFile(wb, name + ".xlsx");
        } catch (err) {
            console.error("export error", err);
        }
    }
}