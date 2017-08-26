import { Item, Items, ODataEntityArray, ODataEntity, ODataParser, FetchOptions, Logger, LogLevel } from "sp-pnp-js";
import { select, expand } from "../sharepoint/utils/decorators";
import { SelectDecoratorsParser, SelectDecoratorsArrayParser } from "../sharepoint/parser/SelectDecoratorsParsers";

import { getSymbol } from "../sharepoint/utils/symbol";

export class ExemplarRTK extends Item {
    @select()
    public ID: number;
    @select()
    public Title: string;
    @select()
    public ServiceCatalog: string;
    @select()
    public RegionalTechnicalCenter: string;
    @select()
    public CompanyCustomer: string;
    @select()
    public Agreement: string;
    @select()
    public OperationAmomunt: string;
    @select()
    public MaterialAmount: string;
    @select()
    public SubcontractingAmount: string;
    @select()
    public ActiveAmount: string;
    @select()
    public TotalAmount: string;
    @select()
    public Status: string;
    @select()
    public Unified: string;

    // override get to enfore select and expand for our fields to always optimize
    public get(parser?: ODataParser<any>, getOptions?: FetchOptions): Promise<any> {
        this
            ._setCustomQueryFromDecorator("select")
            ._setCustomQueryFromDecorator("expand");
        if (parser === undefined) {
            parser = ODataEntity(ExemplarRTK);
        }
        return super.get.call(this, parser, getOptions);
    }

    // overrise getAs method with custom parser
    public getAs<T>(parser?: ODataParser<any>, getOptions?: FetchOptions): Promise<T> {
        this
            ._setCustomQueryFromDecorator("select")
            ._setCustomQueryFromDecorator("expand");
        if (parser === undefined) {
            parser = new SelectDecoratorsParser<ExemplarRTK>(ExemplarRTK);
        }
        return super.get.call(this, parser, getOptions);
    }

    private _setCustomQueryFromDecorator(parameter: string): ExemplarRTK {
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

export class ExemplarRTKList extends Items {

    private ItemTemplate: ExemplarRTK = new ExemplarRTK("");

    public CustomCollectionProps: string = "Custom Collection Prop to pass";

    // override get to enfore select and expand for our fields to always optimize
    public get(parser?: ODataParser<any>, getOptions?: FetchOptions): Promise<any> {
        // public get(): Promise<MyDocument> {
        this
            ._setCustomQueryFromDecorator("select")
            ._setCustomQueryFromDecorator("expand");
        if (parser === undefined) {
            // default parser
            parser = ODataEntityArray(ExemplarRTK);
        }
        return super.get.call(this, parser, getOptions);
    }

    // create new method using custom parser
    public getAsMyDocument(parser?: ODataParser<ExemplarRTK[]>, getOptions?: FetchOptions): Promise<ExemplarRTK[]> {
        this
            ._setCustomQueryFromDecorator("select")
            ._setCustomQueryFromDecorator("expand");
        if (parser === undefined) {
            parser = new SelectDecoratorsArrayParser<ExemplarRTK>(ExemplarRTK);
        }
        return super.get.call(this, parser, getOptions);
    }


    private _setCustomQueryFromDecorator(parameter: string): ExemplarRTKList {
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