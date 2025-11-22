import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { DepartmentModel } from "../../models/department-model";
import { RegionModel } from "../../models/region-model";
import { DepartmentService, RegionService } from "../../services/data-master.service";
import { Messages } from "src/app/helpers/messages";

@Component({
  selector: 'department-dialog-component',
  templateUrl: './department.dialog.component.html'
})
export class DepartmentDialogComponent implements OnInit {
  
  display: boolean = false;
  title: string = '';
  isNew: boolean = false;
  department: DepartmentModel = {} as DepartmentModel;
  loading: boolean = false;

  @Output() departmentModify = new EventEmitter<DepartmentModel[]>();

  regions: RegionModel[] = [];

  constructor(
      private departmentService: DepartmentService,
      private regionService: RegionService 
  ) {}

  ngOnInit() {
      this.getRegions();
  }
  async getRegions() {
      try {
          this.regions = await this.regionService.get();
      } catch (ex) {
          console.error("Error cargando regiones", ex);
      }
  }

  private _getCurrentUserId(): number {
    try {
      const userStored = localStorage.getItem('currentUser'); 
      
      if (userStored) {
        const userObj = JSON.parse(userStored);
        return userObj.userId || 0; 
      }
      return 0;
    } catch (e) {
      return 0;
    }
  }

  showDialog(department: DepartmentModel, isNew: boolean) {
    this.title = isNew ? 'Crear Nuevo Departamento' : 'Editar Departamento';
    this.isNew = isNew;
    this.department = { ...department }; 
    
    if (!isNew && this.department.region) {
        this.department.idRegion = this.department.region.idRegion;
    }

    this.display = true;
  }

  async save() {
    // 1. Validaciones completas
    if (!this.department.departmentName) {
      Messages.warning("Validación", "El nombre del departamento es requerido.");
      return;
    }
    if (!this.department.lat) {
        Messages.warning("Validación", "La latitud es requerida.");
        return;
    }
    if (!this.department.lng) {
        Messages.warning("Validación", "La longitud es requerida.");
        return;
    }
    if (!this.department.idRegion || this.department.idRegion === 0) {
        Messages.warning("Validación", "Debe seleccionar una región.");
        return;
    }

    try {
      this.loading = true;
      let result: DepartmentModel[];
      const currentUserId = this._getCurrentUserId();

      // Aseguramos que los números sean números (a veces los inputs de texto devuelven strings)
      this.department.lat = Number(this.department.lat);
      this.department.lng = Number(this.department.lng);

      if (this.isNew) {
        this.department.isActive = true;
        this.department.createdBy = currentUserId;
        result = await this.departmentService.add(this.department);
        Messages.ok("Éxito", "Departamento creado correctamente");
      } else {
        this.department.updatedBy = currentUserId;
        result = await this.departmentService.edit(this.department);
        Messages.ok("Éxito", "Departamento actualizado correctamente");
      }

      this.departmentModify.emit(result);
      this.display = false;
    } catch (ex: any) {
      // Manejo seguro del mensaje de error para evitar el "TypeError"
      const msg = ex?.error?.message || ex?.message || "Ocurrió un error al guardar";
      Messages.warning("Error", msg);
    } finally {
      this.loading = false;
    }
  }
}