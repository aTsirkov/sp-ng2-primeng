import { Item, Items, List, ODataEntityArray, ODataEntity, ODataParser, FetchOptions, Logger, LogLevel, Queryable } from "sp-pnp-js";
import { select, expand, header } from "../utils/decorators";
import { SelectDecoratorsParser, SelectDecoratorsArrayParser } from "../parser/SelectDecoratorsParsers";

import { getSymbol } from "../utils/symbol";

export interface IModelItem<T>{
    new(baseUrl: string | Queryable, path?: string): T;
}

export class ModelItem extends Item {

    // override get to enfore select and expand for our fields to always optimize
    public get(parser?: ODataParser<any>, getOptions?: FetchOptions): Promise<any> {
        this
            ._setCustomQueryFromDecorator("select")
            ._setCustomQueryFromDecorator("expand");
            //._setCustomQueryFromDecorator("header");
        if (parser === undefined) {
            parser = ODataEntity(ModelItem);
        }
        return super.get.call(this, parser, getOptions);
    }

    // overrise getAs method with custom parser
    public getAs<T>(parser?: ODataParser<any>, getOptions?: FetchOptions): Promise<T> {
        this
            ._setCustomQueryFromDecorator("select")
            ._setCustomQueryFromDecorator("expand");
            //._setCustomQueryFromDecorator("header");
        if (parser === undefined) {
            parser = new SelectDecoratorsParser<ModelItem>(ModelItem);
        }
        return super.get.call(this, parser, getOptions);
    }

    private _setCustomQueryFromDecorator(parameter: string): ModelItem {
        const sym: string = getSymbol(parameter);
        // get pre-saved select and expand props from decorators
        const arrayprops: { propName: string, queryName: string }[] = this[sym];
        let list: string = "";
        if (arrayprops !== undefined && arrayprops !== null) {
            list = arrayprops.map(i => i.queryName).join(",");
        } else {
            Logger.log({
                level: LogLevel.Warning,
                message: "[_setCustomQueryFromDecorator] - empty property: " + parameter + "."
            });
        }
        // use apply and call to manipulate the request into the form we want
        // if another select isn't in place, let's default to only ever getting our fields.
        // implement method chain
        return this._query.getKeys().indexOf("$" + parameter) > -1
            ? this
            : this[parameter].call(this, list);
    }
}

export class ModelItems extends Items {

    private ItemsTemplate: ModelItem = new ModelItem("");

    // override get to enfore select and expand for our fields to always optimize
    public get(parser?: ODataParser<any>, getOptions?: FetchOptions): Promise<any> {
        this
            ._setCustomQueryFromDecorator("select")
            ._setCustomQueryFromDecorator("expand");
            //._setCustomQueryFromDecorator("header");
        if (parser === undefined) {
            parser = ODataEntityArray(ModelItem);
        }
        return super.get.call(this, parser, getOptions);
    }

    // override get to enfore select and expand for our fields to always optimize
    public getAs<T>(parser?: ODataParser<any>, getOptions?: FetchOptions): Promise<any> {
        this
            ._setCustomQueryFromDecorator("select")
            ._setCustomQueryFromDecorator("expand")
            ._setCustomObjectFromDecorator("header");
        let icor: IModelItem<T>;
        if (parser === undefined) {
            parser = new SelectDecoratorsArrayParser<T>(icor);
        }
        return super.get.call(this, parser, getOptions);
    }

    // create new method using custom parser
    public getAsModelItem(parser?: ODataParser<ModelItem[]>, getOptions?: FetchOptions): Promise<ModelItem[]> {
        this
            ._setCustomQueryFromDecorator("select")
            ._setCustomQueryFromDecorator("expand");
            //._setCustomObjectFromDecorator("header");
        if (parser === undefined) {
            parser = new SelectDecoratorsArrayParser<ModelItem>(ModelItem);
        }
        return super.get.call(this, parser, getOptions);
    }


    private _setCustomQueryFromDecorator(parameter: string): ModelItems {
        const sym: string = getSymbol(parameter);
        // get pre-saved select and expand props from decorators
        const arrayprops: { propName: string, queryName: string }[] = this.ItemsTemplate[sym];
        let list: string = "";
        if (arrayprops !== undefined && arrayprops !== null) {
            list = arrayprops.map(i => i.queryName).join(",");
        } else {
            Logger.log({
                level: LogLevel.Warning,
                message: "[_setCustomQueryFromDecorator] - empty property: " + parameter + "."
            });
        }
        // use apply and call to manipulate the request into the form we want
        // if another select isn't in place, let's default to only ever getting our fields.
        // implement method chain
        return this._query.getKeys().indexOf("$" + parameter) > -1
            ? this
            : this[parameter].call(this, list);
    }

    private _setCustomObjectFromDecorator(parameter: string): ModelItems {
        const sym: string = getSymbol(parameter);
        // get pre-saved select and expand props from decorators
        const arrayprops: { propName: string, queryName: string }[] = this.ItemsTemplate[sym];
        let list: string = "";
        if (arrayprops !== undefined && arrayprops !== null) {
            list = arrayprops.map(i => i.queryName).join(",");
        } else {
            Logger.log({
                level: LogLevel.Warning,
                message: "[_setCustomQueryFromDecorator] - empty property: " + parameter + "."
            });
        }
        // use apply and call to manipulate the request into the form we want
        // if another select isn't in place, let's default to only ever getting our fields.
        // implement method chain
        /*return this._query.getKeys().indexOf("$" + parameter) > -1
            ? this
            : this[parameter].call(this, list);*/
        this["columns"] = [1,2,3,4];
        //this.columns = [5,6,7,8];
        return this;
    }
}

export class ModelList extends List {
    public columns: Object = [2,4,6,8];
}