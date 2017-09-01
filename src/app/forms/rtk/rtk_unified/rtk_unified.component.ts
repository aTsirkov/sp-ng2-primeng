import { Component, ViewChild } from '@angular/core';
import { SpService } from '../../../sharepoint/sharepoint.service';
import { DataTable } from 'primeng/primeng';
import { TemplateComponent } from '../../form.template';

@Component({
    selector: 'rtk_unified',
    templateUrl: './rtk_unified.component.html',
    styleUrls: ['./rtk_unified.component.css'],
})
export class unifiedRTKComponent extends TemplateComponent {
    @ViewChild(DataTable) dataTable: DataTable;

    constructor(private spservice: SpService) {
        super(spservice,
            {
                listName: 'List',
                listTitle: 'Унифицированная РТК',
                viewName: 'Все элементы'
            });
    }

    onRowSelect(event) {
        this.newItem = false;
        this.item = this.cloneItem(event.data);
        this.displayDialog = true;
    }

}
