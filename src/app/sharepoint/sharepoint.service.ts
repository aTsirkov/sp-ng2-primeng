import { Injectable, OnDestroy } from '@angular/core';

import pnp, { List, Items, Item } from 'sp-pnp-js';

const adldapFactory = require('adldap')();

import { IModelItem, ModelItems, ModelList } from './test/model.entities';
import { SelectDecoratorsParser, SelectDecoratorsArrayParser } from "./parser/SelectDecoratorsParsers";

@Injectable()
export class SpService {
    private client = adldapFactory({
        searchUser: 'dn=zirkov@mail.ru', //'dn=tsirkovaa,ou=accounts,dn=sibur,dn=local',
        searchUserPass: 'TsirkovAA', //'qwe12345678-=',
        ldapjs: {
            url: 'LDAP://127.0.0.1:398',     //'ldaps://ad.sibur.local',
            searchBase: '*', //'dn=sibur,dn=local',
            scope: 'sub'
        }
    });

    constructor() {
        pnp.setup({
            headers: {
                'Accept': 'application/json; odata=verbose',
                // "content-Type": "application/json;odata=verbose"
            },
        });
    }

    private getFilterString(fltArr: string[]): string {
        return "(InternalName eq " + fltArr.join(") or (InternalName eq ") + ")";
    }

    public getADUsers():Promise<any> {
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
    }

    public getListColumns(params: any = {}): Promise<any> {
        let l: List = pnp.sp.web.lists
            .getByTitle(params.ListName || params);

        return l
            .views
            .getByTitle(params.ViewName || "Все элементы")
            .fields
            .get()
            .then(vf => {
                return l
                    .fields
                    .select("Title", "InternalName", "TypeAsString", "Required", "EnforceUniqueValues", "ReadOnlyField")
                    //.filter(this.getFilterString(vf.Items.results))
                    .get()
                    .then(data => {
                        return data
                            .filter(i => { return vf.Items.results.indexOf(i.InternalName) > -1 })
                            .map(v => {
                                return {
                                    idx:  vf.Items.results.indexOf(v.InternalName),
                                    field: v.InternalName,
                                    header: v.Title,
                                    fieldType: v.TypeAsString,
                                    required: v.Required,
                                    readOnly: v.ReadOnlyField,
                                    unique: v.EnforceUniqueValues
                                }
                            })
                            .sort((l, r) => {
                                return l.idx < r.idx ? -1 : 1;
                            });
                    });
            });
    }

    public getList<T>(params: any = {}, icor: IModelItem<T>): Promise<T[]> {
        let l = pnp.sp.web.lists
            .getByTitle(params.ListName || params)
            .as(ModelList);

        return l
            .items
            .select(params.Fields)
            //.getAs<T>(new SelectDecoratorsArrayParser<T>(icor, true))
            .get()
            .then((data: any[]) => {
                data.forEach(d => delete d.__metadata);
                return data;
            });
    }

    public updateListItem(params: any = {}) {
        var props = params.ItemProps;

        return pnp.sp.web.lists.getByTitle(params.ListName)
            .items
            .getById(props.ID)
            .update(props)
            .then(res => {
                return res.data;
            });
    }

    public addListItem(params: any = {}) {
        var props = params.ItemProps;

        return pnp.sp.web.lists
            .getByTitle(params.ListName)
            .items
            .add(props)
            .then(res => {
                return this.updateProps(props, res.data);
            });
    }

    public deleteListItem(params: any = {}) {
        var props = params.ItemProps;

        return pnp.sp.web.lists
            .getByTitle(params.ListName)
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

    private updateProps(target: any, source: any): any{
        return Object.keys(target)
            .reduce((obj, key) => {
                obj[key] = source[key];
                return obj;
            }, {});
    }
}