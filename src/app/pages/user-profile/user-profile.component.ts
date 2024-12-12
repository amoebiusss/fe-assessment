import { Component } from '@angular/core';

import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ProfileImageComponent } from './profile-image/profile-image.component';
import { ProfileLaunchesComponent } from './profile-launches/profile-launches.component';
import { ProfileStatsComponent } from './profile-stats/profile-stats.component';
import { SurveyComponent } from '../../shared/components/survey/survey.component';
@Component({
	selector: 'app-user-profile',
	imports: [ProfileDetailsComponent, ProfileImageComponent, ProfileLaunchesComponent, ProfileStatsComponent, SurveyComponent],
	templateUrl: './user-profile.component.html',
	styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  heading = 'Your profile, ';
  username = 'Matthias';
}
