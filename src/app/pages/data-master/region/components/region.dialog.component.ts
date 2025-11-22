import { AuthService } from './../../../../service/users/auth.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { RegionModel } from '../../models/region-model';
import { RegionService } from '../../services/data-master.service';
import { Messages } from 'src/app/helpers/messages';
import { User } from 'src/app/models/user';

@Component({
  selector: 'region-dialog-component',
  templateUrl: './region.dialog.component.html'
})
export class RegionDialogComponent {

  display: boolean = false;
  title: string = '';
  isNew: boolean = false;
  region: RegionModel = {} as RegionModel;
  loading: boolean = false;
  user: User;

  @Output() regionModify = new EventEmitter<RegionModel[]>();

  constructor(private regionService: RegionService, private authService: AuthService) {
    this.user = this.authService.UserValue;
  }

//   private _getCurrentUserId(): number {
//     try {
//       const userStored = localStorage.getItem('currentUser');

//       if (userStored) {
//         const userObj = JSON.parse(userStored);
//         return userObj.userId || 0;
//       }
//       return 0;
//     } catch (e) {
//       return 0;
//     }
//   }

  showDialog(region: RegionModel, isNew: boolean) {
    this.title = isNew ? 'Crear Nueva Región' : 'Editar Región';
    this.isNew = isNew;
    this.region = { ...region };
    this.display = true;
  }

  async save() {
    if (!this.region.regionName) {
      Messages.warning("Validación", "El nombre de la región es requerido.");
      return;
    }

    try {
      this.loading = true;
      let result: RegionModel[];
      const currentUserId = this.user.userId;

      if (this.isNew) {
        this.region.isActive = true;
        this.region.createdBy = currentUserId;
        result = await this.regionService.add(this.region);
        Messages.ok("Éxito", "Región creada correctamente");
      } else {
        this.region.updatedBy = currentUserId;
        result = await this.regionService.edit(this.region);
        Messages.ok("Éxito", "Región actualizada correctamente");
      }

      this.regionModify.emit(result);
      this.display = false;
    } catch (ex) {
      Messages.warning("Error", ex);
    } finally {
      this.loading = false;
    }
  }
}
