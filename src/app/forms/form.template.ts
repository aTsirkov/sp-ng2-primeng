import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SpService } from '../sharepoint/sharepoint.service';
import { SPForm, SPFields, SPField, VisibleColumns, SPModel, getListFields, getVisibleColumns, getFormControls } from '../entities/spForm.entities';
import { DataTable } from 'primeng/primeng';

export class TemplateComponent{
    public myForm: FormGroup = new FormGroup({});
    public spForm: SPForm = new SPForm();
    public listFields: SPFields = {};
    public visibleCols: VisibleColumns[];
    public DS: SPModel = new SPModel();

    public item: Object;
    public selectedItem: Object;
    public newItem: boolean;
    public displayDialog: boolean;

    constructor(private service: SpService, private spform: SPForm) {
        this.spForm = spform;

        this.DS['main'] = {
            listName: this.spForm.listName,
            listTitle: this.spForm.listTitle,
            items: []
        };

        this.service
            .getListColumns(this.spForm)
            .then((data: SPField[]) => {
                this.getDS('main', this.spForm, this.listFields);
                this.listFields = getListFields(data);
                this.myForm = new FormGroup(getFormControls(this.listFields));
                this.visibleCols = getVisibleColumns(data);
            });
    }

    updateDM(item: any) {
        Object.keys(this.listFields)
            .filter(f => this.listFields[f].lookupList && !this.listFields[f].readOnly)
            .forEach(i => {
                var sf: SPForm = new SPForm();
                sf.listTitle = this.listFields[i].lookupList;
                sf.viewName = 'Options';
                sf.filter = 'ID eq ' + item[this.listFields[i].lookupField];

                var lf: SPFields = new SPFields;
                lf['ID'] = { idx: 1, field: 'ID', header: 'ID'};
                lf[this.listFields[i].lookupField] = { idx: 2, field: this.listFields[i].lookupField, header: this.listFields[i].lookupField };

                this.getDS(sf.listTitle, sf, lf);
            });
    }

    getDS(DSname: string, spform: SPForm, listFld: SPFields) {
        this.service
            .getList<any>(spform, listFld)
            .then(items => {
                this.DS[DSname].items = items;
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
            let updateObject: Object = new Object;
            Object.keys(this.listFields).forEach(i => {
                updateObject[i] = this.item[i];
            }, this);
            this.service
                .updateListItem(this.spForm, updateObject)
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
