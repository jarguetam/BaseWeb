import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegionModel } from '../models/region-model';
import { DepartmentModel } from '../models/department-model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

    constructor(private http: HttpClient) { }

    async get() {
      return await firstValueFrom(
        this.http.get<RegionModel[]>(
          `${environment.uriLogistic}/api/DataMaster/GetRegion`));
    }

    async add(region: RegionModel) {
      return await firstValueFrom(
        this.http.post<RegionModel[]>(
          `${environment.uriLogistic}/api/DataMaster/AddRegion`, region));
    }

    async edit(region: RegionModel) {
      return await firstValueFrom(
        this.http.put<RegionModel[]>(
          `${environment.uriLogistic}/api/DataMaster/UpdateRegion`, region));
    }
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
    constructor(private http: HttpClient) { }

    async get() {
      return await firstValueFrom(
        this.http.get<DepartmentModel[]>(
          `${environment.uriLogistic}/api/DataMaster/GetDeparment`));
    }

    async add(department: DepartmentModel) {
      return await firstValueFrom(
        this.http.post<DepartmentModel[]>(
          `${environment.uriLogistic}/api/DataMaster/AddDeparment`, department));
    }

    async edit(department: DepartmentModel) {
      return await firstValueFrom(
        this.http.put<DepartmentModel[]>(
          `${environment.uriLogistic}/api/DataMaster/UpdateDeparment`, department));
    }
}