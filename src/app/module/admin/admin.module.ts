import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import { AdmindetailComponent } from './admindetail/admindetail.component';



@NgModule({
  declarations: [
    AdmindetailComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,

  ]
})
export class AdminModule {
}
