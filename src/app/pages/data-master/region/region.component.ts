import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { RegionModel } from '../models/region-model';
import { RegionService } from '../services/data-master.service';
import { Messages } from 'src/app/helpers/messages';
import { AuthService } from 'src/app/service/users/auth.service';
import { RegionDialogComponent } from './components/region.dialog.component';

@Component({
    templateUrl: './region.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['./region.component.scss'], 
})
export class ListRegionsComponent implements OnInit {
    regions: RegionModel[] = [];
    @ViewChild(RegionDialogComponent) RegionDialog: RegionDialogComponent;
    loading: boolean = false;
    title: string = "Listado de Regiones";

    constructor(
        private regionService: RegionService, 
        private auth: AuthService
    ) {}

    ngOnInit() {
        this._getRegions();
    }

    async _getRegions() {
    try {
        this.loading = true;
        this.regions = await this.regionService.get();
        
        if (!this.regions) {
            this.regions = [];
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

    editRegion(region: RegionModel) {
        if (!this.auth.hasPermission("btn_edit_region")) {
            Messages.warning("No tiene acceso", "No puede editar, por favor solicite el acceso");
            return;
        }
        this.RegionDialog.showDialog(region, false);
    }

    addRegion() {

        if (!this.auth.hasPermission("btn_add_region")) {
            Messages.warning("No tiene acceso", "No puede agregar, por favor solicite el acceso");
            return;
        }
        this.RegionDialog.showDialog({} as RegionModel, true);
    }

    regionModify(regions: RegionModel[]) {
        this.regions = regions;
    }
}