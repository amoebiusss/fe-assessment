import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, map, switchMap, catchError, EMPTY, tap } from 'rxjs';

import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ProfileImageComponent } from './profile-image/profile-image.component';
import { ProfileLaunchesComponent } from './profile-launches/profile-launches.component';
import { ProfileStatsComponent } from './profile-stats/profile-stats.component';
import { SurveyComponent } from '../../shared/components/survey/survey.component';
import { UserDataService } from '../../shared/services/user-data.service';
import { DataService } from '../starlink-stats/services/data-service/data.service';
import { CrewMember } from '../../shared/interfaces';

@Component({
	selector: 'app-user-profile',
	imports: [ProfileDetailsComponent, ProfileLaunchesComponent, ProfileStatsComponent, SurveyComponent, RouterModule, ProfileImageComponent],
	providers: [DataService],
	templateUrl: './user-profile.component.html',
	styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
	dataService = inject(DataService);
	userService = inject(UserDataService);

	heading = 'Your profile, ';

	private params = inject(ActivatedRoute).params.pipe(map(res => res['id']));
	id = toSignal(this.params);

	userId = signal<string | null>(null);
	userIds = toSignal(this.dataService.getCrewMemberIds().pipe(filter(Boolean)));
	storedUserData = signal<Partial<CrewMember>>({});

	userInfo = toSignal<CrewMember>(
		toObservable(this.userId).pipe(
			filter(Boolean),
			switchMap(userId =>
				this.dataService.getCrewMemberById(userId).pipe(
					tap(res => {
						if (res) {
							const { id, name, image } = res;
							this.storedUserData.set({ id, name, image });
							this.userService.setData({ id, name, image });
						}
					}),
					catchError((res: HttpErrorResponse) => {
						if (res.message.includes('404')) {
							this.userService.clearData();
							this.userService.setData({ notFound: true });
							this.userId.set(null);
						}
						return EMPTY;
					})
				)
			)
		),
		{ initialValue: null }
	);

	load = effect(() => {
		const { id, notFound } = this.userService.getData() || {};
		const idRouteParam = this.id();

		if ((!id && !notFound) || (!idRouteParam && notFound)) {
			const randomUserId = this.userService.getRandomUserId(this.userIds());
			this.userId.set(randomUserId);
		} else if (id && idRouteParam && id !== idRouteParam) {
			this.userId.set(idRouteParam);
		} else if (id && (id === idRouteParam || !idRouteParam)) {
			this.userId.set(id);
		}
	});
}
