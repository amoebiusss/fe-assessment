export interface StarlinkInfo {
    id: string;
    height_km: number;
    // TODO: add DTO mapper 
    spaceTrack: {
        CREATION_DATE: string;
        COUNTRY_CODE: string;
    }
}

export interface PaginatedStarlinkInfo {
    docs: StarlinkInfo[]
    hasNextPage: boolean;
    totalPages: number;
    page: number;
    nextPage: number;
    prevPage: number;
}
