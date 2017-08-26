import { Component, OnInit } from '@angular/core';
import { SpService } from '../../../sharepoint/sharepoint.service';

import { UnifiedRTK } from '../../../entities/';

@Component({
    selector: 'rtk_unified',
    templateUrl: './rtk_unified.component.html',
    styleUrls: ['./rtk_unified.component.css'],
})
export class unifiedRTKComponent implements OnInit {

    uni_rtks: UnifiedRTK[];
    cols: any[];
    displayDialog: boolean;

    uni_rtk: UnifiedRTK = new UnifiedRTK("");
    selectedRTK: UnifiedRTK;
    newRTK: boolean;

    constructor( private service: SpService) {
    }

    ngOnInit() {
        this.service
            .getList<UnifiedRTK>({ ListName: 'Унифицированная РТК' }, UnifiedRTK)
            .then(uni_rtks => {
                this.uni_rtks = uni_rtks;
            });
        this.cols = [
            { field: 'Title', header: 'Наименование' },
            { field: 'ServiceNameList', header: 'Услуга' },
            { field: 'Status', header: 'Статус' },
            { field: 'Modified', header: 'Изменено' },
            { field: 'Editor', header: 'Кем изменено' },
            { field: 'Created', header: 'Создано' },
            { field: 'Author', header: 'Кем создано' },
            { field: 'UnifiedOperations', header: 'UnifiedOperations' }
        ];
    }

    showDialogToAdd() {
        this.newRTK = true;
        this.uni_rtk = new UnifiedRTK("");
        this.displayDialog = true;
    }

    save() {
        let uni_rtks = [...this.uni_rtks];
        if (this.newRTK)
            uni_rtks.push(this.uni_rtk);
        else
            uni_rtks[this.findSelectedRTKIndex()] = this.uni_rtk;

        this.service.updateListItem({ ListName: 'Унифицированная РТК', ItemID: this.uni_rtk.ID, ItemProps: this.uni_rtk })
            .then(res => {
                if (res) {
                    this.uni_rtks = uni_rtks;
                    this.uni_rtk = null;
                };
            });

        this.displayDialog = false;
    }

    delete() {
        let index = this.findSelectedRTKIndex();
        this.uni_rtks = this.uni_rtks.filter((val, i) => i != index);
        this.uni_rtk = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newRTK = false;
        this.uni_rtk = this.cloneCenter(event.data);
        this.displayDialog = true;
    }

    cloneCenter(c: UnifiedRTK): UnifiedRTK {
        let uni_rtk = new UnifiedRTK("");
        for (let prop in c) {
            uni_rtk[prop] = c[prop];
        }
        return <UnifiedRTK>uni_rtk;
    }

    findSelectedRTKIndex(): number {
        return this.uni_rtks.indexOf(this.selectedRTK);
    }
}