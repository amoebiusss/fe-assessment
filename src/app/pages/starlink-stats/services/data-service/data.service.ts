import { Injectable } from '@angular/core';
import { HttpService } from '../../../../shared/services/http.service';
import { map, Observable } from 'rxjs';

import { StarlinkInfo, PaginatedLaunchInfo, PaginatedStarlinkInfo, LaunchItem } from '../../../../shared/interfaces';

const DOCS_LIMIT = 20;

const starlinkInfoQuery = {
  options: {
  	select: {
      heightKilometers: "$height_km",
      id: "$id",
      creationDate: "$spaceTrack.CREATION_DATE",
      countryCode: "$spaceTrack.COUNTRY_CODE",
      launchId: "$launch",
      launchDate: "$spaceTrack.LAUNCH_DATE",
    },
  }
};

const launchStatsQuery = {
  options: {
  	select: {
      id: "$id",
      success: "$success",
      details: "$details",
      core: {
        $first: "$cores"
      }
    },
    populate: {
      path: "payloads",
      select: {
        mass_kg: "$mass_kg"
      }
    },
  }
};

const starlinksQueryWithPagination = {
  query: {
    height_km: { $ne: null }
  },
  options: {
  	select: {
      heightKilometers: "$height_km",
      id: "$id",
      creationDate: "$spaceTrack.CREATION_DATE",
      countryCode: "$spaceTrack.COUNTRY_CODE"
    },
    limit: DOCS_LIMIT,
  }
};

const starlinksQueryNoPagination = { ...starlinksQueryWithPagination, options: { ...starlinksQueryWithPagination.options, pagination: false } };

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = 'https://api.spacexdata.com/v4';
  starlinkUrl = 'starlink';
  launchUrl = 'launches';

  constructor(private readonly api: HttpService) {}

  getStarlinkStats(): Observable<PaginatedStarlinkInfo> {
    return this.api.post<PaginatedStarlinkInfo>(`${this.baseUrl}/starlink/query`, JSON.stringify(starlinksQueryNoPagination));
  }

  getStarlinkStatsPerPage(page: number): Observable<PaginatedStarlinkInfo> {
    const query = { ...starlinksQueryWithPagination, options: { ...starlinksQueryWithPagination.options, page } };
    return this.api.post<PaginatedStarlinkInfo>(`${this.baseUrl}/${this.starlinkUrl}/query`, JSON.stringify(query));
  }

  getStarlinkById2(starlinkId: string): Observable<StarlinkInfo> {
    return this.api.get<StarlinkInfo>(`${this.baseUrl}/${this.starlinkUrl}/${starlinkId}`);
  }

  getStarlinkById(starlinkId: string): Observable<StarlinkInfo> {
    const query = { ...starlinkInfoQuery, ...this.getQueryById(starlinkId)};
    return this.api.post<PaginatedStarlinkInfo>(`${this.baseUrl}/${this.starlinkUrl}/query`, JSON.stringify(query)).pipe(map(item => item.docs[0]));
  }

  getLaunchStats(launchId: string): Observable<LaunchItem> {
    const query = { ...launchStatsQuery, ...this.getQueryById(launchId) };
    return this.api.post<PaginatedLaunchInfo>(`${this.baseUrl}/${this.launchUrl}/query`, JSON.stringify(query)).pipe(map(item => item.docs[0]));
  }

  getQueryById(id: string) {
    return {
      query: {
        "_id": { $eq: id }
      },
    }
  }
}
