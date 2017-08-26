import { Component, OnInit } from '@angular/core';
import { SpService } from '../../sharepoint/sharepoint.service';

import { RTC } from '../../entities/';

@Component({
    selector: 'rtcenter',
    templateUrl: './rtcenter.component.html',
    styleUrls: ['./rtcenter.component.css'],
})
export class RTCenterComponent implements OnInit {
 //   companies: Company[];
    centers: RTC[];
    cols: any[];
    displayDialog: boolean;

    center: RTC = new RTC("");
    selectedCenter: RTC;
    newCenter: boolean;

    constructor( private service: SpService) {
    }

    ngOnInit() {
        this.service
            .getList<RTC>({ ListName: 'Региональные технические центры' }, RTC)
            .then(centers => {
                this.centers = centers;
            });
        this.cols = [
            { field: 'Title', header: 'Наименование' },
            { field: 'OData__x041f__x043e__x043b__x043d__x04', header: 'Код' },
            { field: 'ServiceManager', header: 'Сервис менеджер' },
            { field: 'Director', header: 'Директор' }
            
        ];
    }

    showDialogToAdd() {
        this.newCenter = true;
        this.center = new RTC("");
        this.displayDialog = true;
    }

    save() {
        let centers = [...this.centers];
        if (this.newCenter)
            centers.push(this.center);
        else
            centers[this.findSelectedCenterIndex()] = this.center;

        this.service.updateListItem({ ListName: 'Региональные технические центры', ItemID: this.center.ID, ItemProps: this.center })
            .then(res => {
                if (res) {
                    this.centers = centers;
                    this.center = null;
                };
            });

        this.displayDialog = false;
    }

    delete() {
        let index = this.findSelectedCenterIndex();
        this.centers = this.centers.filter((val, i) => i != index);
        this.center = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newCenter = false;
        this.center = this.cloneCenter(event.data);
        this.displayDialog = true;
    }

    cloneCenter(c: RTC): RTC {
        let center = new RTC("");
        for (let prop in c) {
            center[prop] = c[prop];
        }
        return <RTC>center;
    }

    findSelectedCenterIndex(): number {
        return this.centers.indexOf(this.selectedCenter);
    }
}