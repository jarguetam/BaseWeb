export interface RegionModel {
    idRegion:      number;
    regionName:    string;
    createdBy:     number;
    createdDate:   string;
    updatedBy:     number;
    updatedDate:   string;
    isActive:      boolean;
    createdByUser: CreatedByUser;
}

export interface CreatedByUser {
    userId:      number;
    name:        string;
    userName:    string;
    password:    string;
    email:       string;
    rolId:       number;
    createDate:  string;
    themeId:     number;
    active:      boolean;
    lastLogin:   string;
    zonaSellers: string;
    whsCode:     string;
}
