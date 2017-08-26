import { Component, OnInit } from '@angular/core';
import { SpService } from '../../../sharepoint/sharepoint.service';

import { ServiceNameList } from '../../../entities/';

@Component({
    selector: 'srv_nomenclature',
    templateUrl: './srv_nomenclature.component.html',
    styleUrls: ['./srv_nomenclature.component.css'],
})
export class SRVnomenclatureComponent implements OnInit {

    srv_names: ServiceNameList[];
    cols: any[];
    displayDialog: boolean;

    srv_name: ServiceNameList = new ServiceNameList("");
    selectedName: ServiceNameList;
    newName: boolean;


    constructor( private service: SpService) {
    }

    ngOnInit() {
        this.service
            .getList<ServiceNameList>({ ListName: 'Номенклатура услуг' }, ServiceNameList)
            .then(srv_names => {
                this.srv_names = srv_names;
            });
        this.cols = [
            { field: 'Title', header: 'Наименование' },
            { field: 'FullName', header: 'Полное наименование' }
            
        ];
        
    }

    showDialogToAdd() {
        this.newName = true;
        this.srv_name = new ServiceNameList("");
        this.displayDialog = true;
    }

    save() {
        let srv_names = [...this.srv_names];
        if (this.newName)
            srv_names.push(this.srv_name);
        else
            srv_names[this.findSelectedNameIndex()] = this.srv_name;

        this.service.updateListItem({ ListName: 'Номенклатура услуг', ItemID: this.srv_name.ID, ItemProps: this.srv_name })
            .then(res => {
                if (res) {
                    this.srv_names = srv_names;
                    this.srv_name = null;
                };
            });

        this.displayDialog = false;
    }

    delete() {
        let index = this.findSelectedNameIndex();
        this.srv_names = this.srv_names.filter((val, i) => i != index);
        this.srv_name = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newName = false;
        this.srv_name = this.cloneName(event.data);
        this.displayDialog = true;
    }

    cloneName(c: ServiceNameList): ServiceNameList {
        let name = new ServiceNameList("");
        for (let prop in c) {
            name[prop] = c[prop];
        }
        return <ServiceNameList>name;
    }

    findSelectedNameIndex(): number {
        return this.srv_names.indexOf(this.selectedName);
    }
}