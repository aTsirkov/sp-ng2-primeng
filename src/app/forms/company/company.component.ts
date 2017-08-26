import { Component, OnInit, ViewChild } from '@angular/core';
import { SpService } from '../../sharepoint/sharepoint.service';
import { DataTable } from 'primeng/primeng';

import { Company } from '../../entities/';


@Component({
    selector: 'company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.css'],
})


export class CompanyComponent implements OnInit {
    companies: Company[];
    cols: any[];
    displayDialog: boolean;

    company: Company = new Company("");

    selectedCompany: Company;

    newCompany: boolean;

    constructor( private service: SpService) {
    }

    @ViewChild(DataTable) dataTable: DataTable;
   
    ngOnInit() {
        this.service
            .getList<Company>({ ListName: 'Заказчики' }, Company)
            .then(companies => {
                this.companies = companies;
            });

        this.cols = [
            { field: 'Title', header: 'Наименование' },
            { field: 'ACBNSI', header: 'Код Контрагента в АСВ НСИ' },
            { field: 'ESUID', header: 'Код Контрагента ЕСУИД' }
        ];

        this.dataTable.updatePaginator();

        this.dataTable.updateTotalRecords();
    }



    showDialogToAdd() {
        this.newCompany = true;
        this.company = new Company("");
        this.displayDialog = true;
    }

    save() {
        let companies = [...this.companies];
        if (this.newCompany)
            companies.push(this.company);
        else
            companies[this.findSelectedCompanyIndex()] = this.company;

        this.service.updateListItem({ ListName: 'Заказчики', ItemID: this.company.ID, ItemProps: this.company })
            .then(res => {
                if (res) {
                    this.companies = companies;
                    this.company = null;
                };
            });

        this.displayDialog = false;
    }

    delete() {
        let index = this.findSelectedCompanyIndex();
        this.companies = this.companies.filter((val, i) => i != index);
        this.company = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newCompany = false;
        this.company = this.cloneCompany(event.data);
        this.displayDialog = true;
    }

    cloneCompany(c: Company): Company {
        let company = new Company("");
        for (let prop in c) {
            company[prop] = c[prop];
        }
        return <Company>company;
    }

    findSelectedCompanyIndex(): number {
        return this.companies.indexOf(this.selectedCompany);
    }
}