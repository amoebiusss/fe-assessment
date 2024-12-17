import { PaginatedInfo } from "./pagination";

export interface User {
    _id: number;
    id: string;
    name: string;
    surname: string;
    agency: string;
    email: string;
    phoneNumber: string;
    social: {
      title: string;
      link: string;
    }
};

export enum UserStatus {
    Active = 'active',
    Inactive = 'inactive',
}

export interface CrewMember {
    id: string;
    name: string;
    image: string;
    wikipedia?: string;
    launches?: string[];
    status?: UserStatus;
    agency?: string;
};

export interface PaginatedUserInfo extends PaginatedInfo {
    docs: User[];
}

export interface PaginatedCrewMembers extends PaginatedInfo {
    docs: CrewMember[];
}