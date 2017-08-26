import { Component, OnInit } from '@angular/core';
import { SpService } from '../../../sharepoint/sharepoint.service';

import { SubcontractingRTK } from '../../../entities/';

@Component({
    selector: 'rtk_subcontracting',
    templateUrl: './rtk_subcontracting.component.html',
    styleUrls: ['./rtk_subcontracting.component.css'],
})
export class subcontractingRTKComponent implements OnInit {

    subs: SubcontractingRTK[];
    cols: any[];
    displayDialog: boolean;

    sub: SubcontractingRTK = new SubcontractingRTK("");
    selectedSub: SubcontractingRTK;
    newSub: boolean;

    constructor( private service: SpService) {
    }

    ngOnInit() {
        this.service
            .getList<SubcontractingRTK>({ ListName: 'Субподряд РТК' }, SubcontractingRTK)
            .then(subs => {
                this.subs = subs;
            });
        this.cols = [
            { field: 'Title', header: 'Наименование' },
            { field: 'ComputedTechnologicalMap', header: 'РТК' },
            { field: 'Operations', header: 'Операция РТК' },
            { field: 'Cost', header: 'Итого стоимость' }
        ];
    }


    showDialogToAdd() {
        this.newSub = true;
        this.sub = new SubcontractingRTK("");
        this.displayDialog = true;
    }

    save() {
        let operations = [...this.subs];
        if (this.newSub)
            operations.push(this.sub);
        else
            operations[this.findSelectedRTKIndex()] = this.sub;

        this.service.updateListItem({ ListName: 'Субподряд РТК', ItemID: this.sub.ID, ItemProps: this.sub })
            .then(res => {
                if (res) {
                    this.subs = operations;
                    this.sub = null;
                };
            });

        this.displayDialog = false;
    }

    delete() {
        let index = this.findSelectedRTKIndex();
        this.subs = this.subs.filter((val, i) => i != index);
        this.sub = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newSub = false;
        this.sub = this.cloneCenter(event.data);
        this.displayDialog = true;
    }

    cloneCenter(c: SubcontractingRTK): SubcontractingRTK {
        let uni_rtk = new SubcontractingRTK("");
        for (let prop in c) {
            uni_rtk[prop] = c[prop];
        }
        return <SubcontractingRTK>uni_rtk;
    }

    findSelectedRTKIndex(): number {
        return this.subs.indexOf(this.selectedSub);
    }
}