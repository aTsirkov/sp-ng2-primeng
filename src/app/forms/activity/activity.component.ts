import { Component, OnInit } from '@angular/core';
import { SpService } from '../../sharepoint/sharepoint.service';

import { Activity } from '../../entities/';

@Component({
    selector: 'activity',
    templateUrl: './activity.component.html',
    styleUrls: ['./activity.component.css'],
})
export class ActivityComponent implements OnInit {
     activities: Activity[];
    cols: any[];
    displayDialog: boolean;

    activity: Activity = new Activity("");
    selectedActivity: Activity;
    newActivity: boolean;


    constructor(private service: SpService) {
    }

    ngOnInit() {
        this.service
            .getList<Activity>({ ListName: 'Направления деятельности' }, Activity)
            .then(activities => {
                this.activities = activities;
            });
        this.cols = [
            { field: 'Title', header: 'Наименование' }

            
        ];

        console.log('Направления деятельности');
    }

    showDialogToAdd() {
        this.newActivity = true;
        this.activity = new Activity("");
        this.displayDialog = true;
    }

    save() {
        let activities = [...this.activities];
        if (this.newActivity)
            activities.push(this.activity);
        else
            activities[this.findSelectedActivityIndex()] = this.activity;

        this.service.updateListItem({ ListName: 'Направления деятельности', ItemID: this.activity.ID, ItemProps: this.activity })
            .then(res => {
                if (res) {
                    this.activities = activities;
                    this.activity = null;
                };
            });

        this.displayDialog = false;
    }

    delete() {
        let index = this.findSelectedActivityIndex();
        this.activities = this.activities.filter((val, i) => i != index);
        this.activity = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newActivity = false;
        this.activity = this.cloneObject(event.data);
        this.displayDialog = true;
    }

    cloneObject(c: Activity): Activity {
        let center = new Activity("");
        for (let prop in c) {
            center[prop] = c[prop];
        }
        return <Activity>center;
    }

    findSelectedActivityIndex(): number {
        return this.activities.indexOf(this.selectedActivity);
    }
}

