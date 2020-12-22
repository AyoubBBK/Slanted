import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesDetailsComponent } from './sales-details/sales-details.component';


const routes: Routes = [
  {  path : 'sales', component : SalesDetailsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
