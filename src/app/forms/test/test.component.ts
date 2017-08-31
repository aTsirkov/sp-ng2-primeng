import { Component, ViewChild } from '@angular/core';
import { SpService } from '../../sharepoint/sharepoint.service';
import { DataTable } from 'primeng/primeng';
import { TemplateComponent } from '../form.template';

@Component({
    selector: 'test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css'],
})
export class TestComponent extends TemplateComponent {
    @ViewChild(DataTable) dataTable: DataTable;

    constructor(private spservice: SpService) {
        super(spservice,
            {
                listName: 'TestSPList',
                listTitle: 'TestSPList',
                viewName: 'Все элементы'
            });
    }

    onRowSelect(event) {
        /*this.updateDM(event.data)
            .then(() => {*/
                //super.onRowSelect(event));
                this.newItem = false;
                this.item = this.cloneItem(event.data);
                this.displayDialog = true;
            //});
    }
    
}
