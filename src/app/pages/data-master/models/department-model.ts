export interface User {
  userId: number;
  name: string;
  userName: string;
  password?: string; 
  email: string;
  rolId: number;
  createDate: string; 
  themeId: number;
  active: boolean;
  lastLogin: string;
  zonaSellers: string;
  whsCode: string;
}

export interface Region {
  idRegion: number;
  regionName: string;
  createdBy: number;
  createdDate: string;
  updatedBy: number;
  updatedDate: string;
  isActive: boolean;
  createdByUser: User; 
}

export interface DepartmentModel {
  idDepartment: number;
  departmentName: string;
  lat: number;
  lng: number;
  idRegion: number;
  createdBy: number;
  createdDate: string;
  updatedBy: number;
  updatedDate: string;
  isActive: boolean;
  region: Region; 
  creator: User;  
}