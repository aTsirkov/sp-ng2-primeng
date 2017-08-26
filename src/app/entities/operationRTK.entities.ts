import { Item, Items, ODataEntityArray, ODataEntity, ODataParser, FetchOptions, Logger, LogLevel } from "sp-pnp-js";
import { select, expand } from "../sharepoint/utils/decorators";
import { SelectDecoratorsParser, SelectDecoratorsArrayParser } from "../sharepoint/parser/SelectDecoratorsParsers";

import { getSymbol } from "../sharepoint/utils/symbol";

export class operationRTK extends Item {
    @select()
    public ID: number;
    @select()
    public Title: string;
    @select()
    public ComputedTechnologicalMap?: string;
    @select()
    public RegionalTechnicalCenter?: string;
    @select()
    public ProductAreas?: string;
    @select()
    public SpecialistsCategories?: string;
    @select()
    public ServiceObjectKind?: string;
    @select()
    public ServiceObjectAmount?: string;
    @select()
    public Town?: string;
    @select()
    public BidSpecialist?: string;
    @select()
    public StandartOperationNumber?: string;
    @select()
    public StandardTime?: string;
    @select()
    public TotalAmount?: string;
    @select()
    public OperationType?: string;
    @select()
    public IsCritical?: string;

    // override get to enfore select and expand for our fields to always optimize
    public get(parser?: ODataParser<any>, getOptions?: FetchOptions): Promise<any> {
        this
            ._setCustomQueryFromDecorator("select")
            ._setCustomQueryFromDecorator("expand");
        if (parser === undefined) {
            parser = ODataEntity(operationRTK);
        }
        return super.get.call(this, parser, getOptions);
    }

    // overrise getAs method with custom parser
    public getAs<T>(parser?: ODataParser<any>, getOptions?: FetchOptions): Promise<T> {
        this
            ._setCustomQueryFromDecorator("select")
            ._setCustomQueryFromDecorator("expand");
        if (parser === undefined) {
            parser = new SelectDecoratorsParser<operationRTK>(operationRTK);
        }
        return super.get.call(this, parser, getOptions);
    }

    private _setCustomQueryFromDecorator(parameter: string): operationRTK {
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

export class operationRTKList extends Items {

    private ItemTemplate: operationRTK = new operationRTK("");

    public CustomCollectionProps: string = "Custom Collection Prop to pass";

    // override get to enfore select and expand for our fields to always optimize
    public get(parser?: ODataParser<any>, getOptions?: FetchOptions): Promise<any> {
        // public get(): Promise<MyDocument> {
        this
            ._setCustomQueryFromDecorator("select")
            ._setCustomQueryFromDecorator("expand");
        if (parser === undefined) {
            // default parser
            parser = ODataEntityArray(operationRTK);
        }
        return super.get.call(this, parser, getOptions);
    }

    // create new method using custom parser
    public getAsMyDocument(parser?: ODataParser<operationRTK[]>, getOptions?: FetchOptions): Promise<operationRTK[]> {
        this
            ._setCustomQueryFromDecorator("select")
            ._setCustomQueryFromDecorator("expand");
        if (parser === undefined) {
            parser = new SelectDecoratorsArrayParser<operationRTK>(operationRTK);
        }
        return super.get.call(this, parser, getOptions);
    }


    private _setCustomQueryFromDecorator(parameter: string): operationRTKList {
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