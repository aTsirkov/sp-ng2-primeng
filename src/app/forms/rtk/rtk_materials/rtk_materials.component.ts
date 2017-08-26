import { Component, OnInit } from '@angular/core';
import { SpService } from '../../../sharepoint/sharepoint.service';

import { MaterialsRTK } from '../../../entities/';


@Component({
    selector: 'rtk_materials',
    templateUrl: './rtk_materials.component.html',
    styleUrls: ['./rtk_materials.component.css'],
})
export class materialsRTKComponent implements OnInit {

    materials: MaterialsRTK[];
    cols: any[];
    displayDialog: boolean;

    material: MaterialsRTK = new MaterialsRTK("");
    selectedMaterial: MaterialsRTK;
    newMaterial: boolean;

    constructor( private service: SpService) {
    }

    ngOnInit() {
        this.service
            .getList<MaterialsRTK>({ ListName: 'Материалы РТК' }, MaterialsRTK)
            .then(materials => {
                this.materials = materials;
            });
        this.cols = [
            { field: 'Title', header: 'Наименование' },
            { field: 'ComputedTechnologicalMap', header: 'РТК' },
            { field: 'Operations', header: 'Операция РТК' },
            { field: 'Cost', header: 'Стоимость' },
            { field: 'Count', header: 'Amount' },
            { field: 'TotalAmount', header: 'Итого стоимость' }

        ];
    }

    showDialogToAdd() {
        this.newMaterial = true;
        this.material = new MaterialsRTK("");
        this.displayDialog = true;
    }

    save() {
        let uni_rtks = [...this.materials];
        if (this.newMaterial)
            uni_rtks.push(this.material);
        else
            uni_rtks[this.findSelectedRTKIndex()] = this.material;

        this.service.updateListItem({ ListName: 'Материалы РТК', ItemID: this.material.ID, ItemProps: this.material })
            .then(res => {
                if (res) {
                    this.materials = uni_rtks;
                    this.material = null;
                };
            });

        this.displayDialog = false;
    }

    delete() {
        let index = this.findSelectedRTKIndex();
        this.materials = this.materials.filter((val, i) => i != index);
        this.material = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newMaterial = false;
        this.material = this.cloneAsset(event.data);
        this.displayDialog = true;
    }

    cloneAsset(c: MaterialsRTK): MaterialsRTK {
        let uni_rtk = new MaterialsRTK("");
        for (let prop in c) {
            uni_rtk[prop] = c[prop];
        }
        return <MaterialsRTK>uni_rtk;
    }

    findSelectedRTKIndex(): number {
        return this.materials.indexOf(this.selectedMaterial);
    }
}