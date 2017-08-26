import { Component, OnInit } from '@angular/core';
import { SpService } from '../../../sharepoint/sharepoint.service';

import { ObjectsRTK } from '../../../entities/';


@Component({
    selector: 'rtk_objects',
    templateUrl: './rtk_objects.component.html',
    styleUrls: ['./rtk_objects.component.css'],
})
export class objectsRTKComponent implements OnInit {

    objects: ObjectsRTK[];
    cols: any[];
    displayDialog: boolean;

    obj: ObjectsRTK = new ObjectsRTK("");
    selectedObject: ObjectsRTK;
    newObject: boolean;

    constructor( private service: SpService) {
    }

    ngOnInit() {
        this.service
            .getList({ ListName: 'Объекты РТК' }, ObjectsRTK)
            .then(objects => {
                this.objects = objects;
            });
        this.cols = [
            { field: 'Title', header: 'Наименование' },
            { field: 'ComputedTechnologicalMap', header: 'РТК' },
            { field: 'ServiceObjectKind', header: 'Вид объекта обслуживания' },
            { field: 'Cost', header: 'Стоимость' },
            { field: 'Count', header: 'Количество' },
            { field: 'TotalAmount', header: 'Итого стоимость' }

        ];
    }

  

    showDialogToAdd() {
        this.newObject = true;
        this.obj = new ObjectsRTK("");
        this.displayDialog = true;
    }

    save() {
        let uni_rtks = [...this.objects];
        if (this.newObject)
            uni_rtks.push(this.obj);
        else
            uni_rtks[this.findSelectedRTKIndex()] = this.obj;

        this.service.updateListItem({ ListName: 'Объекты РТК', ItemID: this.obj.ID, ItemProps: this.obj, Fields: this.cols  })
            .then(res => {
                if (res) {
                    this.objects = uni_rtks;
                    this.obj = null;
                };
            });

        this.displayDialog = false;
    }

    delete() {
        let index = this.findSelectedRTKIndex();
        this.objects = this.objects.filter((val, i) => i != index);
        this.obj = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newObject = false;
        this.obj = this.cloneObject(event.data);
        this.displayDialog = true;
    }

    cloneObject(c: ObjectsRTK): ObjectsRTK {
        let uni_rtk = new ObjectsRTK("");
        for (let prop in c) {
            uni_rtk[prop] = c[prop];
        }
        return <ObjectsRTK>uni_rtk;
    }

    findSelectedRTKIndex(): number {
        return this.objects.indexOf(this.selectedObject);
    }
}