import { Component, OnInit } from '@angular/core';
import { SpService } from '../../sharepoint/sharepoint.service';

import { FRS } from '../../entities/';

@Component({
    selector: 'frs',
    templateUrl: './frs.component.html',
    styleUrls: ['./frs.component.css'],

})
export class FRSComponent implements OnInit {

    frss: FRS[];
    cols: any[];
    displayDialog: boolean;

    frs: FRS = new FRS("");
    selectedFRS: FRS;
    newFRS: boolean;


    constructor( private service: SpService) {
    }

    ngOnInit() {
        this.service
            .getList<FRS>({ Listname: 'ФРС' }, FRS)
            .then(frss => {
                this.frss = frss;
            });
        this.cols = [
            { field: 'Title', header: 'Наименование' },
            { field: 'RegionalTechnicalCenter', header: 'Региональный технический центр' },
            { field: 'ProductAreas', header: 'Направление деятельности' },
            { field: 'SpecialistCategory', header: 'Категория специалиста' },
            { field: 'Town', header: 'Город' },
            { field: 'BidSpecialist', header: 'Ставка' }
              
        ];
    }

    showDialogToAdd() {
        this.newFRS = true;
        this.frs = new FRS("");
        this.displayDialog = true;
    }

    save() {
        let frss = [...this.frss];
        if (this.newFRS)
            frss.push(this.frs);
        else
            frss[this.findSelectedFRSIndex()] = this.frs;

        this.service.updateListItem({ ListName: 'ФРС', ItemID: this.frs.ID, ItemProps: this.frs })
            .then(res => {
                if (res) {
                    this.frss = frss;
                    this.frs = null;
                };
            });

        this.displayDialog = false;
    }

    delete() {
        let index = this.findSelectedFRSIndex();
        this.frss = this.frss.filter((val, i) => i != index);
        this.frs = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newFRS = false;
        this.frs = this.cloneFRS(event.data);
        this.displayDialog = true;
    }

    cloneFRS(c: FRS): FRS {
        let frs = new FRS("");
        for (let prop in c) {
            frs[prop] = c[prop];
        }
        return <FRS>frs;
    }

    findSelectedFRSIndex(): number {
        return this.frss.indexOf(this.selectedFRS);
    }
}
