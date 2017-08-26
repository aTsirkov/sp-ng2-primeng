import { Routes } from '@angular/router';

import { HomeComponent } from './forms/home/home.component';
import { CompanyComponent } from './forms/company/company.component';
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
// Test
import { TestComponent } from './sharepoint/test/test.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'Company', component: CompanyComponent },
  { path: 'TemplateRTK', component: HomeComponent },
  { path: 'RTC', component: RTCenterComponent },
  { path: 'Price', component: HomeComponent },
  { path: 'Orders', component: HomeComponent },
  { path: 'Customers', component: CustomerComponent },
  { path: 'ObjServices', component: SRVObjectKindComponent },
  { path: 'Activity', component: ActivityComponent },
  { path: 'Specialist', component: SpecialistsCategoriesComponent },
  { path: 'ServicesCatlog', component: SRVcatalogComponent },
  { path: 'uniRTK', component: unifiedRTKComponent },
  { path: 'FRS', component: FRSComponent },
  { path: 'Order', component: OrderComponent },
  { path: 'ServiceNomenclature', component: SRVnomenclatureComponent },
  { path: 'exemplarRTK', component: exemplarRTKComponent },
  { path: 'operationRTK', component: operationRTKComponent },
  { path: 'subcontractingRTK', component: subcontractingRTKComponent },
  { path: 'assetsRTK', component: assetsRTKComponent },
  { path: 'materialsRTK', component: materialsRTKComponent },
  { path: 'objectsRTK', component: objectsRTKComponent },
  { path: 'test', component: TestComponent }
];

