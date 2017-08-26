import { Component, OnInit } from '@angular/core';
import { SpService } from '../../../sharepoint/sharepoint.service';

import { ServiceСatalog } from '../../../entities/';

@Component({
    selector: 'srv_catalog',
    templateUrl: './srv_catalog.component.html',
    styleUrls: ['./srv_catalog.component.css'],
})
export class SRVcatalogComponent implements OnInit {

    catalogs: ServiceСatalog[];
    cols: any[];
    displayDialog: boolean;

    catalog: ServiceСatalog = new ServiceСatalog("");
    selectedCatalog: ServiceСatalog;
    newCatalog: boolean;


    constructor( private service: SpService) {
    }

    ngOnInit() {
        this.service
            .getList<ServiceСatalog>({ ListName: 'Каталог услуг' }, ServiceСatalog)
            .then(catalogs => {
                this.catalogs = catalogs;
            });
        this.cols = [
            { field: 'Title', header: 'Наименование' },         
            { field: 'ServiceNameList', header: 'Номенклатура услуг' },
            { field: 'Status', header: 'Статус' },
            { field: 'ServiceObjectKind', header: 'Вид объекта обслуживания' },
            { field: 'MainItSystem', header: 'Ключевая ИТ-система' },

            { field: 'BoundariesServices', header: 'Границы использования' },
            { field: 'Type', header: 'Тип услуги' },
            { field: 'FunctionalAreas', header: 'Функциональные направления' },
            { field: 'ProductAreas', header: 'Продуктовые направления' },
            { field: 'ServiceObjectKindOwnerCompany', header: 'Организация-владелец ресурса' },
            
            { field: 'ServiceObjectKindOwnerBranch', header: 'Обособленное подразделение' },
            { field: 'ServiceObjectKindOwner', header: 'Владелец ресурса' },
            { field: 'ServiceObjectKindOwnerNote', header: 'Комментарий по владельцу ресурса' },
            { field: 'CompanyCustomer', header: 'Заказчик по договору' },
            { field: 'CompanyConsumer', header: 'Наименование Предприятия-потребителя по договору' },

            { field: 'FieldDescription', header: 'Описание площадки' },
            { field: 'ContractorName', header: 'Наименование Подрядчика' },
            { field: 'ContractorACBNSI', header: 'Код АСВ НСИ Подрядчика' },
            { field: 'ContractorESUID', header: 'Код ЕСУИД Подрядчика' },
            { field: 'ContractorBranch', header: 'Обособленное подразделение Подрядчика' },
            
            { field: 'CustomerServiceManager', header: 'Сервис-менеджер от Заказчика' },
            { field: 'CustomerResponsiblePerson', header: 'Ответственный по договору со стороны заказчика' },
            { field: 'EOL', header: 'ЕОЛ' },
            { field: 'ROL', header: 'РОЛ' },
            { field: 'Agreement', header: '№ договора' },

            { field: 'AgreementApplication', header: '№ приложения' },
            { field: 'AgreementSpecification', header: '№ спецификации' },
            { field: 'AdditionalAgreement', header: '№ допсоглашения' },
            { field: 'Renewal', header: 'Продление на следующий период' },
            { field: 'Comment', header: 'Комментарии' },
            
            { field: 'PacketName', header: 'Название пакета' },
            { field: 'ServiceLayerName', header: 'Уровень обслуживания' },
            { field: 'AgreementType', header: 'Тип сервисного договора' },
            { field: 'Description', header: 'Описание' },
            { field: 'RegionalTechnicalCenter', header: 'РТЦ-владелец договора' }
        ];
        
    }

    showDialogToAdd() {
        this.newCatalog = true;
        this.catalog = new ServiceСatalog("");
        this.displayDialog = true;
    }

    save() {
        let objects = [...this.catalogs];
        if (this.newCatalog)
            objects.push(this.catalog);
        else
            objects[this.findSelectedCatalogIndex()] = this.catalog;

        this.service.updateListItem({ ListName: 'Каталог услуг', ItemID: this.catalog.ID, ItemProps: this.catalog })
            .then(res => {
                if (res) {
                    this.catalogs = objects;
                    this.catalog = null;
                };
            });

        this.displayDialog = false;
    }

    delete() {
        let index = this.findSelectedCatalogIndex();
        this.catalogs = this.catalogs.filter((val, i) => i != index);
        this.catalog = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newCatalog = false;
        this.catalog = this.cloneObject(event.data);
        this.displayDialog = true;
    }

    cloneObject(c: ServiceСatalog): ServiceСatalog {
        let center = new ServiceСatalog("");
        for (let prop in c) {
            center[prop] = c[prop];
        }
        return <ServiceСatalog>center;
    }

    findSelectedCatalogIndex(): number {
        return this.catalogs.indexOf(this.selectedCatalog);
    }
}