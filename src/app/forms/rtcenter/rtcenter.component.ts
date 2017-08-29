import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { SpService } from '../../sharepoint/sharepoint.service';
import {
    SPForm, SPField, SPFields, VisibleColumns, SPModel, SPList,
    getListFields, getVisibleColumns, getFormControls
} from '../../entities/spForm.entities';
import { DataTable } from 'primeng/primeng';

@Component({
    selector: 'rtcenter',
    templateUrl: './rtcenter.component.html',
    styleUrls: ['./rtcenter.component.css'],
})
export class RTCenterComponent implements OnInit {
    @ViewChild(DataTable) dataTable: DataTable;

    myForm: FormGroup = new FormGroup({});
    spForm: SPForm = new SPForm();
    listFields: SPFields = {};
    visibleCols: VisibleColumns[];
    DS: SPModel;

    //items: Array<Object>;
    item: Object;
    selectedItem: Object;
    newItem: boolean;
    displayDialog: boolean;

    constructor(private service: SpService, private _fb: FormBuilder) {
        this.spForm.listName = 'List5';
        this.spForm.listTitle = 'Региональные технические центры';
        this.spForm.viewName = 'Все элементы';

        this.DS['main'] = {
            listName: this.spForm.listName,
            listTitle: this.spForm.listTitle,
            items: []
        };

        this.service
            .getListColumns(this.spForm)
            .then(data => {
                this.getItems();
                this.listFields = getListFields(data);
                this.myForm = new FormGroup(getFormControls(this.listFields));
                this.visibleCols = getVisibleColumns(data);
            });
    }

    ngOnInit() { }

    getItems() {
        this.service
            .getList<any>(this.spForm, this.listFields)
            .then(items => {
                this.DS['main'].items = items;
            });
    }

    showDialogToAdd() {
        this.newItem = true;
        this.item = this.cloneItem(this.selectedItem, true);
        this.displayDialog = true;
    }

    save() {
        let _items = [...this.DS['main'].items];
        if (this.newItem) {
            this.service
                .addListItem(this.spForm, this.item)
                .then(newItem => {
                    _items.push(newItem);
                    this.DS['main'].items = _items;
                    this.item = null;
                });
        }
        else {
            this.service
                .updateListItem(this.spForm, this.item)
                .then(item => {
                    _items[this.findSelectedItemIndex()] = this.item;
                    this.DS['main'].items = _items;
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
                    this.DS['main'].items = this.DS['main'].items.filter((val, i) => i != index);
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
        return this.DS['main'].items.indexOf(this.selectedItem);
    }
}