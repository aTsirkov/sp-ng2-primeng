import { Component, OnInit } from '@angular/core';

import { SpService } from '../../sharepoint/sharepoint.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    adUsers: any[] = [];

    constructor(private service: SpService) { }

    ngOnInit() {
        /*this.service.getADUsers()
            .then(response => { this.adUsers = response })*/

    }
}
