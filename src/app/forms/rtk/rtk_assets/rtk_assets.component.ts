import { Component, OnInit } from '@angular/core';
import { SpService } from '../../../sharepoint/sharepoint.service';

import { AssetsRTK } from '../../../entities/';


@Component({
    selector: 'rtk_assets',
    templateUrl: './rtk_assets.component.html',
    styleUrls: ['./rtk_assets.component.css'],
})
export class assetsRTKComponent implements OnInit {

    assets: AssetsRTK[];
    cols: any[];
    displayDialog: boolean;

    asset: AssetsRTK = new AssetsRTK("");
    selectedAsset: AssetsRTK;
    newAsset: boolean;

    constructor( private service: SpService) {
    }

    ngOnInit() {
        this.service
            .getList<AssetsRTK>({ ListName: 'Активы РТК' }, AssetsRTK)
            .then(assets => {
                this.assets = assets;
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
        this.newAsset = true;
        this.asset = new AssetsRTK("");
        this.displayDialog = true;
    }

    save() {
        let uni_rtks = [...this.assets];
        if (this.newAsset)
            uni_rtks.push(this.asset);
        else
            uni_rtks[this.findSelectedRTKIndex()] = this.asset;

        this.service.updateListItem({ ListName: 'Активы РТК', ItemID: this.asset.ID, ItemProps: this.asset })
            .then(res => {
                if (res) {
                    this.assets = uni_rtks;
                    this.asset = null;
                };
            });

        this.displayDialog = false;
    }

    delete() {
        let index = this.findSelectedRTKIndex();
        this.assets = this.assets.filter((val, i) => i != index);
        this.asset = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newAsset = false;
        this.asset = this.cloneAsset(event.data);
        this.displayDialog = true;
    }

    cloneAsset(c: AssetsRTK): AssetsRTK {
        let uni_rtk = new AssetsRTK("");
        for (let prop in c) {
            uni_rtk[prop] = c[prop];
        }
        return <AssetsRTK>uni_rtk;
    }

    findSelectedRTKIndex(): number {
        return this.assets.indexOf(this.selectedAsset);
    }
}