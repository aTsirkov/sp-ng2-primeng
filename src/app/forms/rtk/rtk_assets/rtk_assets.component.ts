import { Component, ViewChild } from '@angular/core';
import { SpService } from '../../../sharepoint/sharepoint.service';
import { DataTable } from 'primeng/primeng';
import { TemplateComponent } from '../../form.template';

@Component({
    selector: 'rtk_assets',
    templateUrl: './rtk_assets.component.html',
    styleUrls: ['./rtk_assets.component.css'],
})
export class assetsRTKComponent extends TemplateComponent {
    @ViewChild(DataTable) dataTable: DataTable;

    constructor(private spservice: SpService) {
        super(spservice,
            {
                listName: 'List12',
                listTitle: 'Активы РТК',
                viewName: 'Все элементы'
            });

    }

}
