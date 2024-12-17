import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { UserDataService } from '../../shared/services/user-data.service';
import { CrewMember } from '../../shared/interfaces';

@Component({
	selector: 'app-home-page',
	imports: [RouterOutlet, AppHeaderComponent],
  providers: [UserDataService],
	templateUrl: './home-page.component.html',
	styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  userDataService = inject(UserDataService);
  userData: Partial<CrewMember> = this.userDataService.getData();
}