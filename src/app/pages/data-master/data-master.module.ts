import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Modules (Agrega los que necesites, basé estos en tu html)
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ChipModule } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
// Si usas skeleton
import { SkeletonModule } from 'primeng/skeleton'; 

import { RegionsRoutingModule } from './data-master-routing.module';
import { ListRegionsComponent } from './region/region.component';
import { RegionDialogComponent } from './region/components/region.dialog.component';

import { DepartmentComponent } from './department/department.component';
import { DepartmentDialogComponent } from './department/components/department.dialog.component';
// Importa tu componente compartido si existe
// import { SkeletonTableComponent } from 'src/app/...';

@NgModule({
  declarations: [
    ListRegionsComponent,
    RegionDialogComponent,
    DepartmentComponent,
    DepartmentDialogComponent,
    // SkeletonTableComponent (si no es standalone o parte de un SharedModule)
  ],
  imports: [
    CommonModule,
    RegionsRoutingModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    ChipModule,
    TooltipModule,
    CheckboxModule,
    SkeletonModule
  ]
})
export class RegionsModule { }