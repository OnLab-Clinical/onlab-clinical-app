export interface Country {
    id: string;
    name: string;
    calling: string;
}

export interface CountryFill extends Country {
    departments: DepartmentFill[];
}

export interface Department {
    id: string;
    name: string;
}

export interface DepartmentFill extends Department {
    municipalities: Municipality[];
}

export interface Municipality {
    id: string;
    name: string;
}
