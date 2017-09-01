import { Component, ViewChild } from '@angular/core';
import { SpService } from '../../sharepoint/sharepoint.service';
import { DataTable } from 'primeng/primeng';
import { TemplateComponent } from '../form.template';

@Component({
    selector: 'frs',
    templateUrl: './frs.component.html',
    styleUrls: ['./frs.component.css'],

})
export class FRSComponent extends TemplateComponent {
    @ViewChild(DataTable) dataTable: DataTable;

    constructor(private spservice: SpService) {
        super(spservice,
            {
                listName: 'List13',
                listTitle: 'ФРС',
                viewName: 'Все элементы'
            });

    }

    onRowSelect(event) {
        this.newItem = false;
        this.item = this.cloneItem(event.data);
        this.displayDialog = true;
    }

}
