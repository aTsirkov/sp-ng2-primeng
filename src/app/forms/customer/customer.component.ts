import { Component, ViewChild } from '@angular/core';
import { SpService } from '../../sharepoint/sharepoint.service';
import { DataTable } from 'primeng/primeng';
import { TemplateComponent } from '../form.template';

@Component({
    selector: 'customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css'],
})
export class CustomerComponent extends TemplateComponent {
    @ViewChild(DataTable) dataTable: DataTable;

    constructor(private spservice: SpService) {
        super(spservice,
            {
                listName: 'List15',
                listTitle: 'Заказчики',
                viewName: 'Все элементы'
            });

    }

    onRowSelect(event) {
        this.newItem = false;
        this.item = this.cloneItem(event.data);
        this.displayDialog = true;
    }

}