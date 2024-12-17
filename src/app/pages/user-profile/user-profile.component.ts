import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, map, switchMap } from 'rxjs';

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
  providers: [DataService, UserDataService],
	templateUrl: './user-profile.component.html',
	styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  dataService = inject(DataService);
  userService = inject(UserDataService);

  heading = 'Your profile, ';

  private params = inject(ActivatedRoute).params.pipe(map(res => res['id']));
	id = toSignal(this.params);
  userId = signal<string | null>('null');
  userIds = toSignal(this.dataService.getCrewMemberIds().pipe(filter(Boolean)));

  userInfo = toSignal<CrewMember>(
		toObservable(this.userId).pipe(filter(Boolean), switchMap(userId => this.dataService.getCrewMemberById(userId))),
		{ initialValue: null }
	);

  constructor() {
		effect(() => {
        const storedUserData = this.userService.getData();
        const storedId = storedUserData?.id;

        // TODO set name to ls, use it for header
        if (!storedId) {
          const randomUserId = this.userService.getRandomUserId(this.userIds());
          this.userService.setData(randomUserId);
          this.userId.set(randomUserId);
        } else if (storedId && this.id() && (storedId !== this.id())) {
          this.userService.setData(this.id());
          this.userId.set(this.id());
        } else if (storedId && (storedId === this.id() || !this.id())) {
          this.userId.set(storedId);
        }
		});
	}
}
