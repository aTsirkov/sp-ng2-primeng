import { Component, ViewChild } from '@angular/core';
import { SpService } from '../../sharepoint/sharepoint.service';
import { DataTable } from 'primeng/primeng';
import { TemplateComponent } from '../form.template';

@Component({
    selector: 'rtcenter',
    templateUrl: './rtcenter.component.html',
    styleUrls: ['./rtcenter.component.css'],
})
export class RTCenterComponent extends TemplateComponent {
    @ViewChild(DataTable) dataTable: DataTable;

    constructor(private spservice: SpService) {
        super(spservice,
            {
                listName: 'List5',
                listTitle: 'Региональные технические центры',
                viewName: 'Все элементы'
            });

    }

}