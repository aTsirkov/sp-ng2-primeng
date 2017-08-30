import { Component, ViewChild } from '@angular/core';
import { SpService } from '../../../sharepoint/sharepoint.service';
import { DataTable } from 'primeng/primeng';
import { TemplateComponent } from '../../form.template';

@Component({
    selector: 'srv_catalog',
    templateUrl: './srv_catalog.component.html',
    styleUrls: ['./srv_catalog.component.css'],
})
export class SRVcatalogComponent extends TemplateComponent {
    @ViewChild(DataTable) dataTable: DataTable;

    constructor(private spservice: SpService) {
        super(spservice,
            {
                listName: 'ServiceCatalog',
                listTitle: 'Каталог услуг',
                viewName: 'Все элементы'
            });

    }

}
