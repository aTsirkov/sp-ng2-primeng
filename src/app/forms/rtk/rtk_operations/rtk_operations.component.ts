import { Component, Inject, OnInit } from '@angular/core';
import { SpService } from '../../../sharepoint/sharepoint.service';

import { operationRTK } from '../../../entities/';

@Component({
    selector: 'rtk_operations',
    templateUrl: './rtk_operations.component.html',
    styleUrls: ['./rtk_operations.component.css'],
})
export class operationRTKComponent implements OnInit {
    operation: operationRTK = new operationRTK("");
    operations: operationRTK[];
    cols: any[];
    displayDialog: boolean;

    selectedExemplar: operationRTK;
    newExemplar: boolean;

    constructor(private service: SpService) { }

    ngOnInit() {
        this.service
            .getList<operationRTK>({ ListName: 'Операции РТК' }, operationRTK)
            .then((items: operationRTK[]) => {
                this.operations = items;
            });

        this.cols = [
            { field: 'ID', header: 'ИД' },
            { field: 'Title', header: 'Наименование' },
            { field: 'ComputedTechnologicalMap', header: 'Услуга' },
            { field: 'RegionalTechnicalCenter', header: 'Региональный технический центр' },
            { field: 'ProductAreas', header: 'Направление деятельности' },
            { field: 'SpecialistsCategories', header: 'Категория специалиста' },
            { field: 'ServiceObjectKind', header: 'Виды объектов обслуживания' },
            { field: 'ServiceObjectAmount', header: 'Количество объектов обслуживания' },
            { field: 'Town', header: 'Город' },
            { field: 'BidSpecialist', header: 'Ставка' },
            { field: 'StandartOperationNumber', header: 'Операций на 1 объект' },
            { field: 'StandardTime', header: 'Время выполнения операции' },
            { field: 'TotalAmount', header: 'Итого стоимость' },
            { field: 'OperationType', header: 'Тип операции' },
            { field: 'IsCritical', header: 'Критичная' }
        ];
    }

    showDialogToAdd() {
        this.newExemplar = true;
        this.operation = new operationRTK("");
        this.displayDialog = true;
    }

    save() {
        let operations = [...this.operations];
        if (this.newExemplar) {
            this.service
                .addListItem({ ListName: 'Операции РТК', ItemProps: this.operation })
                .then(newItem => {
                    operations.push(newItem);
                    this.operations = operations;
                    this.operation = null;
                });
        }
        else {
            this.service
                .updateListItem({ ListName: 'Операции РТК', ItemProps: this.operation })
                .then(item => {
                    operations[this.findSelectedRTKIndex()] = this.operation;
                    this.operations = operations;
                    this.operation = null;
                });
        }

        this.displayDialog = false;
    }

    delete() {
        let index = this.findSelectedRTKIndex();
        
        this.service
            .deleteListItem({ ListName: 'Операции РТК', ItemProps: this.operation })
            .then(res => {
                if (res) {
                    this.operation = null;
                    this.operations = this.operations.filter((val, i) => i != index);
                    this.displayDialog = false;
                }
            })
    }

    onRowSelect(event) {
        this.newExemplar = false;
        this.operation = Object.assign({}, event.data);
        this.displayDialog = true;
    }

    findSelectedRTKIndex(): number {
        return this.operations.indexOf(this.selectedExemplar);
    }
}
