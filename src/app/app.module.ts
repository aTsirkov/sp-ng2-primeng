import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { BusyModule, BusyConfig } from 'angular2-busy';

import { HomeComponent } from './forms/home/home.component';
import { CompanyComponent } from './forms/company/company.component';
import { PanelMenuComponent } from './forms/menupanel/panelmenu.component';

import { CustomerComponent } from './forms/customer/customer.component';
import { RTCenterComponent } from './forms/rtcenter/rtcenter.component';
import { SRVObjectKindComponent } from './forms/services/object_kind/srv_obj_kind.component';
import { ActivityComponent } from './forms/activity/activity.component';
import { SpecialistsCategoriesComponent } from './forms/specialist/specialist.component';
import { SRVcatalogComponent } from './forms/services/srv_catalog/srv_catalog.component';
import { unifiedRTKComponent } from './forms/rtk/rtk_unified/rtk_unified.component';
import { FRSComponent } from './forms/frs/frs.component';
import { OrderComponent } from './forms/order/order.component';
import { SRVnomenclatureComponent } from './forms/services/srv_nomenclature/srv_nomenclature.component';
import { exemplarRTKComponent } from './forms/rtk/rtk_exemplar/rtk_exemplar.component';
import { operationRTKComponent } from './forms/rtk/rtk_operations/rtk_operations.component';
import { subcontractingRTKComponent } from './forms/rtk/rtk_subcontracting/rtk_subcontracting.component';
import { assetsRTKComponent } from './forms/rtk/rtk_assets/rtk_assets.component';
import { materialsRTKComponent } from './forms/rtk/rtk_materials/rtk_materials.component';
import { objectsRTKComponent } from './forms/rtk/rtk_objects/rtk_objects.component';

import { SpService } from './sharepoint/sharepoint.service';
import { ExtractPropertyPipe } from './sharepoint/ItemTransform.pipe';
// Test
import { TestComponent } from './forms/test/test.component';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import {
    PanelMenuModule, SharedModule, ToolbarModule, TooltipModule, ButtonModule, TabViewModule, DataTableModule,
    DialogModule, InputTextareaModule, DropdownModule, MultiSelectModule, ListboxModule, InputTextModule, CalendarModule
} from 'primeng/primeng';

@NgModule({
  declarations: [
      AppComponent,
      HomeComponent,
      CompanyComponent,
      PanelMenuComponent,
      CustomerComponent,
      RTCenterComponent,
      SRVObjectKindComponent,
      ActivityComponent,
      SpecialistsCategoriesComponent,
      SRVcatalogComponent,
      unifiedRTKComponent,
      FRSComponent,
      OrderComponent,
      SRVnomenclatureComponent,
      exemplarRTKComponent,
      operationRTKComponent,
      subcontractingRTKComponent,
      assetsRTKComponent,
      materialsRTKComponent,
      objectsRTKComponent,
      TestComponent,
      ExtractPropertyPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    BusyModule.forRoot(
        new BusyConfig({
            message: 'и Мы работаем над этим...',
            backdrop: false
        })
        ),
    RouterModule.forRoot(rootRouterConfig, { useHash: true }),
    ToolbarModule, PanelMenuModule, SharedModule,
    TooltipModule, ButtonModule, TabViewModule,
    DataTableModule, DialogModule, InputTextareaModule,
    DropdownModule, MultiSelectModule, ListboxModule,
    InputTextModule, CalendarModule
  ],
  providers: [SpService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
