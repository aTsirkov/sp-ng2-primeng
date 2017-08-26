import { Component, OnInit } from "@angular/core";

// import { Observable } from 'rxjs/Rx';

import { MenuItem } from 'primeng/primeng';

@Component({
    selector: 'panel-menu',
    template: require('./panelmenu.component.html'),
    styles: [require('./panelmenu.component.css')],
    // providers: [PanelMenuService]
})
export class PanelMenuComponent implements OnInit {

    private items: MenuItem[];

    constructor() {
    }

    ngOnInit() {
        this.items = [
            {
                label: 'Главная',
                routerLink: ['home']
            },
            {
                label: 'Тест',
                routerLink: ['test']
            },
            {
                label: 'Справочники',
                icon: 'fa-cogs pull-right',
                items: [
                    {
                        label: 'Заказчики',
                        routerLink: ['Company'] 
                    },
                    {
                        label: 'Виды объектов обслуживания',
                        routerLink: ['ObjServices'] 
                    },
                    {
                        label: 'Направления деятельности',
                        routerLink: ['Activity'] 
                    },
                    {
                        label: 'Каталог услуг',
                        routerLink: ['ServicesCatlog']
                    },
                    {
                        label: 'Номенклатура услуг',
                        routerLink: ['ServiceNomenclature']
                    },
                    {
                        label: 'Региональные технические центры',
                        routerLink: ['RTC']
                    },
                    {
                        label: 'Категории специалистов',
                        routerLink: ['Specialist']
                    },
                    {
                        label: 'ФРС',
                        routerLink: ['FRS']
                    }
                ]
            },
            {
                label: 'Унифицированная РТК',
                icon: 'fa-bar-chart pull-right',
                routerLink: ['uniRTK']
            },
            {
                label: 'РТК',
                icon: 'fa-bar-chart pull-right',
                items: [
                    {
                        label: 'Экземпляры РТК',
                        routerLink: ['exemplarRTK']
                    },
                    {
                        label: 'Объекты РТК',
                        routerLink: ['objectsRTK']
                    },
                    {
                        label: 'Операции РТК',
                        routerLink: ['operationRTK']
                    },
                    {
                        label: 'Материалы РТК',
                        routerLink: ['materialsRTK']
                    },
                    {
                        label: 'Субподряд РТК',
                        routerLink: ['subcontractingRTK']
                    },
                    {
                        label: 'Активы РТК',
                        routerLink: ['assetsRTK']
                    }
                ]
            }, 
            {
                label: 'Заказы',
                icon: 'fa-bar-chart pull-right',
                routerLink: ['Order']
            },
            {
                label: 'Форма',
                icon: 'fa-bar-chart pull-right',
                routerLink: ['Форма']
            }
        ];
    }
}