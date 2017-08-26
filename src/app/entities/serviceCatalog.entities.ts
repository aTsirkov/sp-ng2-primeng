import { Item, Items, ODataEntityArray, ODataEntity, ODataParser, FetchOptions, Logger, LogLevel } from "sp-pnp-js";
import { select, expand } from "../sharepoint/utils/decorators";
import { SelectDecoratorsParser, SelectDecoratorsArrayParser } from "../sharepoint/parser/SelectDecoratorsParsers";

import { getSymbol } from "../sharepoint/utils/symbol";

export class ServiceСatalog extends Item {
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
    public ServiceNameList: number;     // Подстановка из номенклатура услуг
    @select()
    public Status: number;
    @select()
    public ServiceObjectKind: number;   //Виды объектов обслуживания
    @select()
    public MainItSystem: string;
    @select()
    public BoundariesServices: number;
    @select()
    public Type: number;
    @select()
    public FunctionalAreas: number;
    @select()
    public ProductAreas: number;
    @select()
    public ServiceObjectKindOwnerCompany: string;
    @select()
    public ServiceObjectKindOwnerBranch: string;
    @select()
    public ServiceObjectKindOwner: string; //Пользователь или группа
    @select()
    public ServiceObjectKindOwnerNote: string;
    @select()
    public CompanyCustomer: number;    // Заказчики 
    @select()
    public CompanyConsumer: number;    // Заказчики 
    @select()
    public FieldDescription: string;
    @select()
    public ContractorName: string;
    @select()
    public ContractorACBNSI: string;
    @select()
    public ContractorESUID: string;
    @select()
    public ContractorBranch: string;
    @select()
    public CustomerServiceManager: string;  //Пользователь или группа
    @select()
    public CustomerResponsiblePerson: string;  //Пользователь или группа
    @select()
    public EOL: string; //Пользователь или группа
    @select()
    public ROL: string; //Пользователь или группа
    @select()
    public Agreement: string;
    @select()
    public AgreementApplication: string;
    @select()
    public AgreementSpecification: string;
    @select()
    public AdditionalAgreement: string;
    @select()
    public Renewal: boolean;
    @select()
    public Comment: string;
    @select()
    public PacketName: string;
    @select()
    public ServiceLayerName: string;
    @select()
    public AgreementType: string;
    @select()
    public Description: string;
    @select()
    public RegionalTechnicalCenter: number;    //Региональные технические центры

    // override get to enfore select and expand for our fields to always optimize
    public get(parser?: ODataParser<any>, getOptions?: FetchOptions): Promise<any> {
        this
            ._setCustomQueryFromDecorator("select")
            ._setCustomQueryFromDecorator("expand");
        if (parser === undefined) {
            parser = ODataEntity(ServiceСatalog);
        }
        return super.get.call(this, parser, getOptions);
    }

    // overrise getAs method with custom parser
    public getAs<T>(parser?: ODataParser<any>, getOptions?: FetchOptions): Promise<T> {
        this
            ._setCustomQueryFromDecorator("select")
            ._setCustomQueryFromDecorator("expand");
        if (parser === undefined) {
            parser = new SelectDecoratorsParser<ServiceСatalog>(ServiceСatalog);
        }
        return super.get.call(this, parser, getOptions);
    }

    private _setCustomQueryFromDecorator(parameter: string): ServiceСatalog {
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

export class ServiceСatalogList extends Items {

    private ItemTemplate: ServiceСatalog = new ServiceСatalog("");

    public CustomCollectionProps: string = "Custom Collection Prop to pass";

    // override get to enfore select and expand for our fields to always optimize
    public get(parser?: ODataParser<any>, getOptions?: FetchOptions): Promise<any> {
        // public get(): Promise<MyDocument> {
        this
            ._setCustomQueryFromDecorator("select")
            ._setCustomQueryFromDecorator("expand");
        if (parser === undefined) {
            // default parser
            parser = ODataEntityArray(ServiceСatalog);
        }
        return super.get.call(this, parser, getOptions);
    }

    // create new method using custom parser
    public getAsMyDocument(parser?: ODataParser<ServiceСatalog[]>, getOptions?: FetchOptions): Promise<ServiceСatalog[]> {
        this
            ._setCustomQueryFromDecorator("select")
            ._setCustomQueryFromDecorator("expand");
        if (parser === undefined) {
            parser = new SelectDecoratorsArrayParser<ServiceСatalog>(ServiceСatalog);
        }
        return super.get.call(this, parser, getOptions);
    }


    private _setCustomQueryFromDecorator(parameter: string): ServiceСatalogList {
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