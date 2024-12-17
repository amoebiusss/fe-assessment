import { Component, input } from '@angular/core';

import { CrewMember, UserStatus } from '../../../shared/interfaces';

@Component({
  selector: 'app-profile-stats',
  imports: [],
  templateUrl: './profile-stats.component.html',
  styleUrl: './profile-stats.component.scss'
})
export class ProfileStatsComponent {
  user = input<CrewMember | null>();
  UserStatus = UserStatus;
}
