import { Injectable } from '@angular/core';
import { HttpService } from '../../../../shared/services/http.service';
import { Observable } from 'rxjs';

import { StarlinkInfo, PaginatedStarlinkInfo } from '../../../../shared/interfaces';

export const BASE_URL = 'https://api.spacexdata.com';


const starlinksQueryWithPagination = {
  query: {
    height_km: { $ne: null }
  },
  options: {
  	select: ["height_km", "id", "spaceTrack.CREATION_DATE", "spaceTrack.COUNTRY_CODE"],
  }
};

const starlinksQueryNoPagination = { ...starlinksQueryWithPagination, options: { ...starlinksQueryWithPagination.options, pagination: false} };

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = 'https://api.spacexdata.com/v4';

  constructor(private readonly api: HttpService) {}

  getStarlinkStats(): Observable<PaginatedStarlinkInfo> {
    return this.api.post<PaginatedStarlinkInfo>(`${this.baseUrl}/starlink/query`, JSON.stringify(starlinksQueryNoPagination));
  }

  getStarlinkStatsPerPage(page: number): Observable<PaginatedStarlinkInfo> {
    const query = { ...starlinksQueryWithPagination, options: { ...starlinksQueryWithPagination.options, page } };
    return this.api.post<PaginatedStarlinkInfo>(`${this.baseUrl}/starlink/query`, JSON.stringify(query));
  }

  getStarlinkById(id: string): Observable<StarlinkInfo> {
    return this.api.get<StarlinkInfo>(`${this.baseUrl}/starlink/${id}`);
  }
}