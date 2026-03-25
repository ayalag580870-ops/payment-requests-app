import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RequestsListComponent } from './pages/requests-list/requests-list.component';
import { RequestFormComponent } from './pages/request-form/request-form.component';
import { RequestDetailsComponent } from './pages/request-details/request-details.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { RoleSwitchComponent } from './components/role-switch/role-switch.component';
import { StatusBadgeComponent } from './components/status-badge/status-badge.component';
import { SlaBadgeComponent } from './components/sla-badge/sla-badge.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestsListComponent,
    RequestFormComponent,
    RequestDetailsComponent,
    DashboardComponent,
    RoleSwitchComponent,
    StatusBadgeComponent,
    SlaBadgeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}