import { Component, OnInit } from '@angular/core';
import { SpService } from '../../../sharepoint/sharepoint.service';
import { SelectItem } from 'primeng/primeng';

import { ExemplarRTK, RTC, ServiceСatalog, StatusEnum } from '../../../entities/';

@Component({
    selector: 'rtk_exemplar',
    templateUrl: './rtk_exemplar.component.html',
    styleUrls: ['./rtk_exemplar.component.css'],
})
export class exemplarRTKComponent implements OnInit {

    exemplars: ExemplarRTK[];
    cols: any[];
    displayDialog: boolean;

    exemplar: ExemplarRTK = new ExemplarRTK("");
    selectedExemplar: ExemplarRTK;
    newExemplar: boolean;

    statuses: SelectItem[];
    selectedStatus: string;

    // rtcsMas: RTC[];
    // servicesMas: ServiceСatalog[];


    rtcs: SelectItem[];
    services: SelectItem[];
    selectedRTC: string;
    selectedService: string;



    constructor( private service: SpService) {

        this.statuses = [];
        this.statuses.push({ label: 'Проект', value: 'Проект' });
        this.statuses.push({ label: 'Активна', value: 'Активна' });
        this.statuses.push({ label: 'Архив', value: 'Архив' });
        
    }


    ngOnInit() {
        this.service
            .getList<ExemplarRTK>({ ListName: 'Экземпляры РТК' }, ExemplarRTK)
            .then(exemplars => {
                this.exemplars = exemplars;
            });

        this.service
            .getList<ServiceСatalog>({ ListName: 'Каталог услуг' }, ServiceСatalog)
            .then(services => {
                this.services = services.map(i => { return {label: i.Title, value: i} });
                this.services.push({ label: null, value: null });
            });

        this.service
            .getList<RTC>({ ListName: 'Региональные технические центры' }, RTC)
            .then(rtcs => {              
                this.rtcs = rtcs.map(i => { return { label: i.Title, value: i } });
                this.rtcs.push({ label: null, value: null });         
            });

        this.cols = 
            [
            { field: 'Title', header: 'Наименование' },
            { field: 'ServiceCatalog', header: 'Услуга' },
            { field: 'RegionalTechnicalCenter', header: 'РТЦ-владелец договора' },
            { field: 'CompanyCustomer', header: 'Заказчик' },
            { field: 'Agreement', header: 'Код договора' },
            { field: 'OperationAmount', header: 'Сумма по операциям' },
            { field: 'MaterialAmount', header: 'Сумма по материалам' },
            { field: 'SubcontractingAmount', header: 'Сумма по субподряду' },
            { field: 'ActiveAmount', header: 'Сумма по активам' },
            { field: 'TotalAmount', header: 'Сумма по РТК' },
            { field: 'Status', header: 'Статус' },
            { field: 'Unified', header: 'Унифицирована' }
        ];
    }

    showDialogToAdd() {
        this.newExemplar = true;
        this.exemplar = new ExemplarRTK("");
        this.displayDialog = true;
    }

    save() {
        let uni_rtks = [...this.exemplars];
        if (this.newExemplar)
            uni_rtks.push(this.exemplar);
        else
            uni_rtks[this.findSelectedRTKIndex()] = this.exemplar;

        this.service.updateListItem({ ListName: 'Экземпляры РТК', ItemID: this.exemplar.ID, ItemProps: this.exemplar })
            .then(res => {
                if (res) {
                    this.exemplars = uni_rtks;
                    this.exemplar = null;                };
            });


        this.displayDialog = false;
    }

    delete() {
        let index = this.findSelectedRTKIndex();
        this.exemplars = this.exemplars.filter((val, i) => i != index);
        this.exemplar = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newExemplar = false;
        this.exemplar = this.cloneExemplar(event.data);
        this.displayDialog = true;
    }

    cloneExemplar(c: ExemplarRTK): ExemplarRTK {
        let uni_rtk = new ExemplarRTK("");
        for (let prop in c) {
            uni_rtk[prop] = c[prop];
        }
        return <ExemplarRTK>uni_rtk;
    }

    findSelectedRTKIndex(): number {
        return this.exemplars.indexOf(this.selectedExemplar);
    }
}