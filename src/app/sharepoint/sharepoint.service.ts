import { Injectable, OnDestroy } from '@angular/core';

import pnp, { List, Items, Item } from 'sp-pnp-js';
import { SPForm, SPFields } from '../entities/spForm.entities';

//const adldapFactory = require('adldap');
//var adldapFactory = require('adldap')();

@Injectable()
export class SpService {
    /*private client = adldapFactory({
        searchUser: 'dn=tsirkovaa,ou=accounts,dn=sibur,dn=local',
        searchUserPass: 'qwe12345678-=',
        ldapjs: {
            url: 'ldaps://ad.sibur.local',
            searchBase: 'dn=sibur,dn=local',
            scope: 'sub'
        }
    });*/

    constructor() {
        pnp.setup({
            headers: {
                'Accept': 'application/json; odata=verbose',
            },
        });
    }

    /*public getADUsers(): Promise<any> {
        //var res: Promise<any>;
        return this.client.bind()
            .then(() => {
                this.client.search('(&(objectCategory=person)(objectClass=user))')
                    .then((user) => user.json())
                    .catch((err) => console.error(err))
                    .then(() => this.client.unbind())
            })
            .catch((err) => console.error(err));
        //return res;
    }*/

    public getListColumns(params: SPForm): Promise<any> {
        let l: List = pnp.sp.web.lists
            .getByTitle(params.listTitle);       //list

        return l
            .views
            .getByTitle(params.viewName)    // || "Все элементы"
            .fields
            .get()
            .then(vf => {   // view fields
                return l
                    .fields
                    .filter("(Hidden eq false and ReadOnlyField eq false and InternalName ne 'ContentType') or InternalName eq 'ID' or InternalName eq 'Author' or InternalName eq 'Editor' or InternalName eq 'Created' or InternalName eq 'Modfied'")
                    .select("Title", "InternalName", "TypeAsString", "Required", "EnforceUniqueValues", "ReadOnlyField", "DefaultValue", "MaxLength", "ValidationFormula", "ValidationMessage", "Choices", "LookupField", "LookupList")
                    .get()
                    .then((res: any[]) => { // list fields
                        return res.map(v => {
                            return {
                                idx: vf.Items.results.indexOf(v.InternalName) < 0 ? 9999 : vf.Items.results.indexOf(v.InternalName),
                                field: v.InternalName,
                                header: v.Title,
                                fieldType: v.TypeAsString,
                                required: v.Required,
                                readOnly: v.ReadOnlyField,
                                unique: v.EnforceUniqueValues,
                                hidden: vf.Items.results.indexOf(v.InternalName) > -1 ? false : true,
                                defaultValue: v.DefaultValue,
                                maxLength: v.MaxLength,
                                validationFormula: v.ValidationFormula,
                                validationMessage: v.ValidationMessage,
                                choices: v.Choices ? v.Choices.results
                                    .map(i => {
                                        return { label: i, value: i }
                                    }) : undefined,
                                lookupField: v.LookupField,
                                lookupList: v.LookupList,
                                isVirtual: false
                            };
                        })
                    })
                    .then(r => {
                        let prom = r
                            .map(i => {
                                if (i.lookupList) {
                                    return pnp.sp.web.lists.getById(i.lookupList).get()
                                        .then(ll => {
                                            i.lookupList = ll.Title;
                                            return i;
                                        });
                                }
                                else return i;
                            });
                        return Promise.all(prom)
                            .then(response => response);
                    });
            });
    }

    public getList<T>(params: SPForm, fields: SPFields): Promise<T[]> {
        let l = pnp.sp.web.lists
            .getByTitle(params.listTitle)

        return l
            .items
            .expand(this.expand(fields))
            .select(this.select(fields))
            //.getAs<T>(new SelectDecoratorsArrayParser<T>(icor, true))
            .get()
            .then((data: any[]) => {
                data.forEach(d => delete d.__metadata);
                return data;
            });
    }

    public updateListItem(params: SPForm, props: any) {
        return pnp.sp.web.lists.getByTitle(params.listTitle)
            .items
            .getById(props.ID)
            .update(props)
            .then(res => {
                return res.data;
            });
    }

    public addListItem(params: SPForm, props: any) {
        return pnp.sp.web.lists
            .getByTitle(params.listTitle)
            .items
            .add(props)
            .then(res => {
                return this.updateProps(props, res.data);
            });
    }

    public deleteListItem(params: SPForm, props: any) {
        return pnp.sp.web.lists
            .getByTitle(params.listTitle)
            .items
            .getById(props.ID)
            .delete()
            .then(res => {
                return true;
            });
    }

    private getProps(o: any, fld: Array<any>): any {
        return Object.keys(o)
            .filter(key => fld.indexOf(key) > -1)
            .reduce((obj, key) => {
                obj[key] = o[key];
                return obj;
            }, {});
    }

    private updateProps(target: any, source: any): any {
        return Object.keys(target)
            .reduce((obj, key) => {
                obj[key] = source[key];
                return obj;
            }, {});
    }

    private select(fld: SPFields): string {
        let s: string[] = [];
        Object.keys(fld).forEach(f => {
            if (fld[f].fieldType === "User" || fld[f].fieldType === "Lookup")
                s.push(fld[f].field + '/Title');
            else
                s.push(fld[f].field);
        });
        return s.join(',');
    }

    private expand(fld: SPFields): string {
        let e: string[] = [];
        Object.keys(fld).forEach(f => {
            if (fld[f].fieldType === "User" || fld[f].fieldType === "Lookup") e.push(fld[f].field + '/Title');
        });
        return e.join(',');
    }
}