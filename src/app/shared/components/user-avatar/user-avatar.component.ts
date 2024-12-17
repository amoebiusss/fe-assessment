import { Component, input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-user-avatar',
  imports: [TitleCasePipe],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss'
})
export class UserAvatarComponent {
  readonly name = input<string>();
  readonly image = input<string>();
}
