import { Component, input } from '@angular/core';

import { UserAvatarComponent } from '../user-avatar/user-avatar.component';
import { CrewMember } from '../../interfaces';

@Component({
  selector: 'app-header',
  imports: [UserAvatarComponent],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent {
  user = input<Partial<CrewMember>>({});
}
