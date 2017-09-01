import { Component, ViewChild } from '@angular/core';
import { SpService } from '../../../sharepoint/sharepoint.service';
import { DataTable } from 'primeng/primeng';
import { TemplateComponent } from '../../form.template';

@Component({
    selector: 'rtk_objects',
    templateUrl: './rtk_objects.component.html',
    styleUrls: ['./rtk_objects.component.css'],
})
export class objectsRTKComponent extends TemplateComponent {
    @ViewChild(DataTable) dataTable: DataTable;

    constructor(private spservice: SpService) {
        super(spservice,
            {
                listName: 'List10',
                listTitle: 'Объекты РТК',
                viewName: 'Все элементы'
            });

    }

    onRowSelect(event) {
        this.newItem = false;
        this.item = this.cloneItem(event.data);
        this.displayDialog = true;
    }

}
