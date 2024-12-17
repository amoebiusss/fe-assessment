import { PaginatedInfo } from './pagination';

export interface StarlinkInfo {
    id: string;
    heightKilometers: number;
    creationDate: string;
    countryCode: string;
    launchId?: string;
    launchDate?: string;
}

export interface PaginatedStarlinkInfo extends PaginatedInfo {
    docs: StarlinkInfo[];
}