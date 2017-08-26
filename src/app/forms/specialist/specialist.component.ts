import { Component, OnInit } from '@angular/core';
import { SpService } from '../../sharepoint/sharepoint.service';

import { SpecialistsCategories } from '../../entities/';

@Component({
    selector: 'specialist',
    templateUrl: './specialist.component.html',
    styleUrls: ['./specialist.component.css'],
})
export class SpecialistsCategoriesComponent implements OnInit {

    categories: SpecialistsCategories[];
    cols: any[];
    displayDialog: boolean;

    category: SpecialistsCategories = new SpecialistsCategories("");
    selectedCategory: SpecialistsCategories;
    newCategory: boolean;


    constructor( private service: SpService) {
    }

    ngOnInit() {
        this.service
            .getList<SpecialistsCategories>({ ListName: 'Категории специалистов' }, SpecialistsCategories)
            .then(categories => {
                this.categories = categories;
            });
        this.cols = [
            { field: 'Title', header: 'Наименование' },
            { field: 'ProductAreas', header: 'Направление деятельности' }
            
        ];

        console.log('Направления деятельности');
    }

    showDialogToAdd() {
        this.newCategory = true;
        this.category = new SpecialistsCategories("");
        this.displayDialog = true;
    }

    save() {
        let categories = [...this.categories];
        if (this.newCategory)
            categories.push(this.category);
        else
            categories[this.findSelectedCategoryIndex()] = this.category;

        this.service.updateListItem({ ListName: 'Категории специалистов', ItemID: this.category.ID, ItemProps: this.category })
            .then(res => {
                if (res) {
                    this.categories = categories;
                    this.category = null;
                };
            });

        this.displayDialog = false;
    }

    delete() {
        let index = this.findSelectedCategoryIndex();
        this.categories = this.categories.filter((val, i) => i != index);
        this.category = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newCategory = false;
        this.category = this.cloneObject(event.data);
        this.displayDialog = true;
    }

    cloneObject(c: SpecialistsCategories): SpecialistsCategories {
        let center = new SpecialistsCategories("");
        for (let prop in c) {
            center[prop] = c[prop];
        }
        return <SpecialistsCategories>center;
    }

    findSelectedCategoryIndex(): number {
        return this.categories.indexOf(this.selectedCategory);
    }
}