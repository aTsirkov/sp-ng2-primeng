import { Item, Items, ODataEntityArray, ODataEntity, ODataParser, FetchOptions, Logger, LogLevel } from "sp-pnp-js";
import { select, expand } from "../sharepoint/utils/decorators";
import { SelectDecoratorsParser, SelectDecoratorsArrayParser } from "../sharepoint/parser/SelectDecoratorsParsers";

import { getSymbol } from "../sharepoint/utils/symbol";

export class ObjectsRTK extends Item {
    @select()
    public ID: number;
    @select()
    public Title: string;
    @select()
    public Modified: Date;
    @select()
    public Created: Date;
    @select()
    public Author: string;  //Пользователь или группа
    @select()
    public Editor: string;  //Пользователь или группа
    @select()
    public ComputedTechnologicalMap: number;
    @select()
    public ServiceObjectKind: number;
    @select()
    public Count: number;
    @select()
    public Cost: number;
    @select()
    public TotalAmount: number;

    // override get to enfore select and expand for our fields to always optimize
    public get(parser?: ODataParser<any>, getOptions?: FetchOptions): Promise<any> {
        this
            ._setCustomQueryFromDecorator("select")
            ._setCustomQueryFromDecorator("expand");
        if (parser === undefined) {
            parser = ODataEntity(ObjectsRTK);
        }
        return super.get.call(this, parser, getOptions);
    }

    // overrise getAs method with custom parser
    public getAs<T>(parser?: ODataParser<any>, getOptions?: FetchOptions): Promise<T> {
        this
            ._setCustomQueryFromDecorator("select")
            ._setCustomQueryFromDecorator("expand");
        if (parser === undefined) {
            parser = new SelectDecoratorsParser<ObjectsRTK>(ObjectsRTK);
        }
        return super.get.call(this, parser, getOptions);
    }

    private _setCustomQueryFromDecorator(parameter: string): ObjectsRTK {
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

export class ObjectsRTKList extends Items {

    private ItemTemplate: ObjectsRTK = new ObjectsRTK("");

    public CustomCollectionProps: string = "Custom Collection Prop to pass";

    // override get to enfore select and expand for our fields to always optimize
    public get(parser?: ODataParser<any>, getOptions?: FetchOptions): Promise<any> {
        // public get(): Promise<MyDocument> {
        this
            ._setCustomQueryFromDecorator("select")
            ._setCustomQueryFromDecorator("expand");
        if (parser === undefined) {
            // default parser
            parser = ODataEntityArray(ObjectsRTK);
        }
        return super.get.call(this, parser, getOptions);
    }

    // create new method using custom parser
    public getAsMyDocument(parser?: ODataParser<ObjectsRTK[]>, getOptions?: FetchOptions): Promise<ObjectsRTK[]> {
        this
            ._setCustomQueryFromDecorator("select")
            ._setCustomQueryFromDecorator("expand");
        if (parser === undefined) {
            parser = new SelectDecoratorsArrayParser<ObjectsRTK>(ObjectsRTK);
        }
        return super.get.call(this, parser, getOptions);
    }


    private _setCustomQueryFromDecorator(parameter: string): ObjectsRTKList {
        const sym: string = getSymbol(parameter);
        // get pre-saved select and expand props from decorators
        const arrayprops: { propName: string, queryName: string }[] = this.ItemTemplate[sym];
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