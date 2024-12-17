import { Component, inject, input } from '@angular/core';

import { UserDataService } from '../../../shared/services/user-data.service';
import { User } from '../../../shared/interfaces';

@Component({
  selector: 'app-profile-details',
  imports: [],
  providers: [UserDataService],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss'
})
export class ProfileDetailsComponent {
  dataService = inject(UserDataService);
  user = input<User>({} as User); 
}