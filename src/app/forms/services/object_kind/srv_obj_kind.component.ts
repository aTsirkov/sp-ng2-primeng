import { Component, OnInit } from '@angular/core';
import { SpService } from '../../../sharepoint/sharepoint.service';

import { ServiceObjectKind } from '../../../entities/';

@Component({
    selector: 'object_kind',
    templateUrl: './srv_obj_kind.component.html',
    styleUrls: ['./srv_obj_kind.component.css'],
})
export class SRVObjectKindComponent implements OnInit {

    objects: ServiceObjectKind[];
    cols: any[];
    displayDialog: boolean;

    object: ServiceObjectKind = new ServiceObjectKind("");
    selectedObject: ServiceObjectKind;
    newObject: boolean;


    constructor( private service: SpService) {
    }

    ngOnInit() {
        this.service
            .getList<ServiceObjectKind>({ ListName: 'Виды объектов обслуживания' }, ServiceObjectKind)
            .then(objects => {
                this.objects = objects;
            });
        this.cols = [
            { field: 'Title', header: 'Наименование' },
            { field: 'Code', header: 'Полное наименование' }

            
        ];
        
    }

    showDialogToAdd() {
        this.newObject = true;
        this.object = new ServiceObjectKind("");
        this.displayDialog = true;
    }

    save() {
        let objects = [...this.objects];
        if (this.newObject)
            objects.push(this.object);
        else
            objects[this.findSelectedObjectIndex()] = this.object;

        this.service.updateListItem({ ListName: 'Виды объектов обслуживания', ItemID: this.object.ID, ItemProps: this.object })
            .then(res => {
                if (res) {
                    this.objects = objects;
                    this.object = null;
                };
            });

        this.displayDialog = false;
    }

    delete() {
        let index = this.findSelectedObjectIndex();
        this.objects = this.objects.filter((val, i) => i != index);
        this.object = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newObject = false;
        this.object = this.cloneObject(event.data);
        this.displayDialog = true;
    }

    cloneObject(c: ServiceObjectKind): ServiceObjectKind {
        let center = new ServiceObjectKind("");
        for (let prop in c) {
            center[prop] = c[prop];
        }
        return <ServiceObjectKind>center;
    }

    findSelectedObjectIndex(): number {
        return this.objects.indexOf(this.selectedObject);
    }
}