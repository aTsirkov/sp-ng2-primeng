import { Component, ViewChild } from '@angular/core';
import { SpService } from '../../../sharepoint/sharepoint.service';
import { DataTable } from 'primeng/primeng';
import { TemplateComponent } from '../../form.template';

@Component({
    selector: 'object_kind',
    templateUrl: './srv_obj_kind.component.html',
    styleUrls: ['./srv_obj_kind.component.css'],
})
export class SRVObjectKindComponent extends TemplateComponent {
    @ViewChild(DataTable) dataTable: DataTable;

    constructor(private spservice: SpService) {
        super(spservice,
            {
                listName: 'List3',
                listTitle: 'Виды объектов обслуживания',
                viewName: 'Все элементы'
            });

    }

}
