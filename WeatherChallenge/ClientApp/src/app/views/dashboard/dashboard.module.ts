import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

// Toastr

import { ToasterModule, ToasterService } from 'angular2-toaster/angular2-toaster';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  imports: [
    DashboardRoutingModule,
    CommonModule,
    ChartsModule,
    DataTablesModule,
    FormsModule,
    ToasterModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [DashboardComponent],
  providers: [ ToasterService],
})
export class DashboardModule { }
