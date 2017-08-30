import { Component, ViewChild } from '@angular/core';
import { SpService } from '../../../sharepoint/sharepoint.service';
import { DataTable } from 'primeng/primeng';
import { TemplateComponent } from '../../form.template';

@Component({
    selector: 'rtk_materials',
    templateUrl: './rtk_materials.component.html',
    styleUrls: ['./rtk_materials.component.css'],
})
export class materialsRTKComponent extends TemplateComponent {
    @ViewChild(DataTable) dataTable: DataTable;

    constructor(private spservice: SpService) {
        super(spservice,
            {
                listName: 'List11',
                listTitle: 'Материалы РТК',
                viewName: 'Все элементы'
            });

    }

}
