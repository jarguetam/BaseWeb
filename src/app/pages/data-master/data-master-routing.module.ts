import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRegionsComponent } from './region/region.component';
import { DepartmentComponent } from './department/department.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'listado-regiones',
                component: ListRegionsComponent,
            },
            {
                path: 'departamentos',
                component: DepartmentComponent,
            },
            { path: '**', redirectTo: 'listado-regiones' },
        ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionsRoutingModule { }