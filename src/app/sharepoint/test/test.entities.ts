import { select, expand, header } from "../utils/decorators";

import {ModelItem, ModelItems } from './model.entities';

export class TestItem extends ModelItems {
    @select()
    public ID: number;
    @select()
    public Title: string;
    @select()
    @header('dddddd')
    public ProductNumber: number;
    @select()
    public OrderDate: Date;
    // @select()
    public OrderAmount: number;

    public cust: string = "fffffff";
    public attachmentFiles: any;
    public columns: Object;

}