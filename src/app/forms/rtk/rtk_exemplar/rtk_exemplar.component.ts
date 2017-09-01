import { Component, ViewChild } from '@angular/core';
import { SpService } from '../../../sharepoint/sharepoint.service';
import { DataTable } from 'primeng/primeng';
import { TemplateComponent } from '../../form.template';

@Component({
    selector: 'rtk_exemplar',
    templateUrl: './rtk_exemplar.component.html',
    styleUrls: ['./rtk_exemplar.component.css'],
})
export class exemplarRTKComponent extends TemplateComponent {
    @ViewChild(DataTable) dataTable: DataTable;

    constructor(private spservice: SpService) {
        super(spservice,
            {
                listName: 'List14',
                listTitle: 'Экземпляры РТК',
                viewName: 'Все элементы'
            });

    }

    onRowSelect(event) {
        this.newItem = false;
        this.item = this.cloneItem(event.data);
        this.displayDialog = true;
    }

}
