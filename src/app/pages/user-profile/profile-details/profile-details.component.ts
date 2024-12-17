import { Component, input } from '@angular/core';

import { CrewMember } from '../../../shared/interfaces';

@Component({
  selector: 'app-profile-details',
  imports: [],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss'
})
export class ProfileDetailsComponent {
  user = input<CrewMember| null>({} as CrewMember); 
}