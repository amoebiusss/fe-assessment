import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { map } from 'rxjs';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ProfileImageComponent } from './profile-image/profile-image.component';
import { ProfileLaunchesComponent } from './profile-launches/profile-launches.component';
import { ProfileStatsComponent } from './profile-stats/profile-stats.component';
import { SurveyComponent } from '../../shared/components/survey/survey.component';
import { UserDataService } from '../../shared/services/user-data.service'

@Component({
	selector: 'app-user-profile',
	imports: [ProfileDetailsComponent, ProfileImageComponent, ProfileLaunchesComponent, ProfileStatsComponent, SurveyComponent, RouterModule],
  providers: [UserDataService],
	templateUrl: './user-profile.component.html',
	styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  heading = 'Your profile, ';
  username = 'Matthias';
  constructor(private readonly dataService: UserDataService) {}

  private params = inject(ActivatedRoute).params.pipe(map(res => res['id']));
	id = toSignal(this.params);

  // TODO: get id from route params, compare with localstorage value, if they're != then rewrite and change user profile in header
}
