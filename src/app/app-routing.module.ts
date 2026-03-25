import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RequestsListComponent } from './pages/requests-list/requests-list.component';
import { RequestFormComponent } from './pages/request-form/request-form.component';
import { RequestDetailsComponent } from './pages/request-details/request-details.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'requests', pathMatch: 'full' },
  { path: 'requests', component: RequestsListComponent },
  { path: 'requests/new', component: RequestFormComponent },
  { path: 'requests/edit/:id', component: RequestFormComponent },
  { path: 'requests/:id', component: RequestDetailsComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
