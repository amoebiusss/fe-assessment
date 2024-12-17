import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { map } from 'rxjs';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ProfileImageComponent } from './profile-image/profile-image.component';
import { ProfileLaunchesComponent } from './profile-launches/profile-launches.component';
import { ProfileStatsComponent } from './profile-stats/profile-stats.component';
import { SurveyComponent } from '../../shared/components/survey/survey.component';
import { UserDataService } from '../../shared/services/user-data.service';
import { DataService } from '../starlink-stats/services/data-service/data.service';

@Component({
	selector: 'app-user-profile',
	imports: [ProfileDetailsComponent, ProfileImageComponent, ProfileLaunchesComponent, ProfileStatsComponent, SurveyComponent, RouterModule],
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
  user = this.userService.getUser(this.id());
  username = 'Matthias';

  constructor() {
		effect(() => {
			  // TODO: get id from route params, compare with localstorage value, if they're != then rewrite and change user profile in header
		});
	}
}
