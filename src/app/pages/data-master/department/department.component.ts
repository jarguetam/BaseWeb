import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentModel } from '../models/department-model';
import { DepartmentService } from '../services/data-master.service';
import { Messages } from 'src/app/helpers/messages';
import { AuthService } from 'src/app/service/users/auth.service';
import { DepartmentDialogComponent } from './components/department.dialog.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss'
})
export class DepartmentComponent implements OnInit {
  departments: DepartmentModel[] = [];
      @ViewChild(DepartmentDialogComponent) DepartmentDialog!: DepartmentDialogComponent;
      loading: boolean = false;
      title: string = "Listado de Departamentos";
  
      constructor(
          private departmentService: DepartmentService, 
          private auth: AuthService
      ) {}
  
      ngOnInit() {
          this._getDepartments();
      }
  
      async _getDepartments() {
      try {
          this.loading = true;
          this.departments = await this.departmentService.get();
          
          if (!this.departments) {
              this.departments = [];
          }
  
          Messages.closeLoading(); 
          this.loading = false;
      }
      catch (ex: any) {
          this.loading = false;
          console.error("Error completo:", ex);
  
          let errorMessage = "Ocurrió un error desconocido";
  
          if (ex && ex.error && ex.error.message) {
              errorMessage = ex.error.message;
          } else if (ex && ex.message) {
              errorMessage = ex.message;
          } else if (typeof ex === 'string') {
              errorMessage = ex;
          }
  
          Messages.warning("Advertencia", errorMessage);
      }
  }
  
      editDepartment(department: DepartmentModel) {
          if (!this.auth.hasPermission("btn_edit_department")) {
              Messages.warning("No tiene acceso", "No puede editar, por favor solicite el acceso");
              return;
          }
          this.DepartmentDialog.showDialog(department, false);
      }
  
      addDepartment() {
  
          if (!this.auth.hasPermission("btn_add_department")) {
              Messages.warning("No tiene acceso", "No puede agregar, por favor solicite el acceso");
              return;
          }
          this.DepartmentDialog.showDialog({} as DepartmentModel, true);
      }
  
      departmentModify(departments: DepartmentModel[]) {
          this.departments = departments;
      }
  }
