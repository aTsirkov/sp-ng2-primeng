import { Component, ViewChild } from '@angular/core';
import { SpService } from '../../../sharepoint/sharepoint.service';
import { DataTable } from 'primeng/primeng';
import { TemplateComponent } from '../../form.template';

@Component({
    selector: 'rtk_subcontracting',
    templateUrl: './rtk_subcontracting.component.html',
    styleUrls: ['./rtk_subcontracting.component.css'],
})
export class subcontractingRTKComponent extends TemplateComponent {
    @ViewChild(DataTable) dataTable: DataTable;

    constructor(private spservice: SpService) {
        super(spservice,
            {
                listName: 'List9',
                listTitle: 'Субподряд РТК',
                viewName: 'Все элементы'
            });

    }

    onRowSelect(event) {
        this.newItem = false;
        this.item = this.cloneItem(event.data);
        this.displayDialog = true;
    }

}
