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
            listName: spform.listName,
            listTitle: spform.listTitle,
            items: []
        };

        this.service
            .getListColumns(this.spForm)
            .then((data: SPField[]) => {
                this.listFields = getListFields(data);
                this.getDS('main', this.spForm, this.listFields);
                this.myForm = new FormGroup(getFormControls(this.listFields));
                this.visibleCols = getVisibleColumns(data);
            });
    }

    updateDM(item: any): Promise<any> {
        var prom: Promise<any>[] = [];
        Object.keys(this.listFields)
            .filter(f => this.listFields[f].lookupField && !this.listFields[f].readOnly)
            .forEach(i => {
                var sf: SPForm = new SPForm();
                sf.listTitle = this.listFields[i].lookupList;
                sf.viewName = 'Options';
                if (this.listFields[i].parentList)
                    sf.filter = 'ID eq ' + item[i + '/' + this.listFields[i].lookupField];

                var lf: SPFields = new SPFields;
                lf['Id'] = { idx: 0, field: 'Id', header: 'Id' };
                lf['ID'] = { idx: 1, field: 'ID', header: 'value' };
                lf[this.listFields[i].lookupField] = { idx: 2, field: this.listFields[i].lookupField, header: 'label' };

                prom.push(this.getDS(sf.listTitle, sf, lf));
            });
        return Promise.all(prom);
    }

    getDS(DSname: string, spform: SPForm, listFld: SPFields): Promise<any> {
        return this.service
            .getList<any>(spform, listFld)
            .then(items => {
                if (this.DS[DSname] == undefined) {
                    this.DS[DSname] = {
                        listName: spform.listName,
                        listTitle: spform.listTitle,
                        items: []
                    }
                }
                if (DSname !== 'main')
                    this.DS[DSname].items = items.map(i => {
                        var r = {};
                        Object.keys(listFld)
                            .forEach(f => {
                                r[listFld[f].header] = i[listFld[f].field];
                            }, this)
                        return r;
                    });
                else
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

        let updateObject: Object = new Object;
        /*Object.keys(this.listFields)
            .filter(f => ((!this.listFields[f].readOnly) || this.listFields[f].field == 'ID'))
            .forEach(i => {
                var ii;
                if (this.listFields[i].lookupList)
                    ii = i.slice(0, i.length - 2);
                else
                    ii = i;
                updateObject[ii] = this.item[i];
            }, this);*/
        updateObject['RegionalTechnicalCenter'] = {};
        updateObject['RegionalTechnicalCenter']['ID'] = 1;
        updateObject['ID'] = 1;

        if (this.newItem) {
            this.service
                .addListItem(this.spForm, updateObject)
                .then(newItem => {
                    _items.push(newItem);
                    this.DS['main'].items = _items;
                    this.item = null;
                });
        }
        else {
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

    /*onRowSelect(event) {
        this.newItem = false;
        this.item = this.cloneItem(event.data);
        this.displayDialog = true;
    }*/

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
