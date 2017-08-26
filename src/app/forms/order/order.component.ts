import { Component, OnInit } from '@angular/core';
import { SpService } from '../../sharepoint/sharepoint.service';

import { Order } from '../../entities/';

@Component({
    selector: 'order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],

})
export class OrderComponent implements OnInit {

    orders: Order[];
    cols: any[];
    displayDialog: boolean;

    order: Order = new Order("");
    selectedOrder: Order;
    newOrder: boolean;


    constructor( private service: SpService) {
    }

    ngOnInit() {
        this.service
            .getList<Order>({ ListName: 'Заказ' }, Order)
            .then(orders => {
                this.orders = orders;
            });
        this.cols = [
            { field: 'Title', header: 'Наименование' },
            { field: 'RegionalTechnicalCenter', header: 'Региональный технический центр' },
            { field: 'Company', header: 'Заказчик' },
            { field: 'TotalAmount', header: 'Сумма РТК' },
            { field: 'Operations', header: 'Operations' },
            { field: 'MapMaterial', header: 'MapMaterial' },
            { field: 'MapSubcontracting', header: 'MapSubcontracting' },
            { field: 'MapActive', header: 'MapActive' }
              
        ];
    }


    showDialogToAdd() {
        this.newOrder = true;
        this.order = new Order("");
        this.displayDialog = true;
    }

    save() {
        let frss = [...this.orders];
        if (this.newOrder)
            frss.push(this.order);
        else
            frss[this.findSelectedOrderIndex()] = this.order;

        this.service.updateListItem({ ListName: 'Заказ', ItemID: this.order.ID, ItemProps: this.order })
            .then(res => {
                if (res) {
                    this.orders = frss;
                    this.order = null;
                };
            });

        this.displayDialog = false;
    }

    delete() {
        let index = this.findSelectedOrderIndex();
        this.orders = this.orders.filter((val, i) => i != index);
        this.order = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newOrder = false;
        this.order = this.cloneOrder(event.data);
        this.displayDialog = true;
    }

    cloneOrder(c: Order): Order {
        let order = new Order("");
        for (let prop in c) {
            order[prop] = c[prop];
        }
        return <Order>order;
    }

    findSelectedOrderIndex(): number {
        return this.orders.indexOf(this.selectedOrder);
    }
}
