import { Component, OnInit, ViewChild } from '@angular/core';
import { SpService } from '../../sharepoint/sharepoint.service';
import { SPForm } from '../../entities/spForm.entities';
import { DataTable } from 'primeng/primeng';

@Component({
    selector: 'test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css'],
})

export class TestComponent implements OnInit {
    private spForm: SPForm;
    items: Array<Object>;
    item: Object;
    selectedItem: Object;
    newItem: boolean;
    displayDialog: boolean;

    constructor(private service: SpService) {
        this.spForm.ListName = 'testSPlist';
        this.spForm.ViewName = 'Все элементы';

        this.service
            .getListColumns(this.spForm)
            .then(data => {
                this.spForm.Fields = data;
                this.getItems();
            });
    }

    @ViewChild(DataTable) dataTable: DataTable;

    ngOnInit() { }

    getItems(){
        this.service
            .getList<any>(this.spForm)
            .then(items => {
                this.items = items;
            });
    }

    showDialogToAdd() {
        this.newItem = true;
        this.item = this.cloneItem(this.selectedItem, true);
        this.displayDialog = true;
    }

    save() {
        let _items = [...this.items];
        if (this.newItem) {
            this.service
                .addListItem(this.spForm, this.item )
                .then(newItem => {
                    _items.push(newItem);
                    this.items = _items;
                    this.item = null;
                });
        }
        else {
            this.service
                .updateListItem(this.spForm, this.item)
                .then(item => {
                    _items[this.findSelectedItemIndex()] = this.item;
                    this.items = _items;
                    this.item = null;
                });
        }

        this.displayDialog = false;
    }

    delete() {
        let index = this.findSelectedItemIndex();

        this.service
            .deleteListItem(this.spForm, this.item)
            .then(res => {
                if (res) {
                    this.items = this.items.filter((val, i) => i != index);
                    this.item = null;
                    this.displayDialog = false;
                }
            })
    }

    onRowSelect(event) {
        this.newItem = false;
        this.item = this.cloneItem(event.data);
        this.displayDialog = true;
    }

    cloneItem(c: Object, empty?: boolean): Object {
        let _item = {};
        for (let prop in c) {
            if (empty)
                _item[prop] = undefined;
            else
                _item[prop] = c[prop];
        }
        return _item;
    }

    findSelectedItemIndex(): number {
        return this.items.indexOf(this.selectedItem);
    }
}