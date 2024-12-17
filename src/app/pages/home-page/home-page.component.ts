import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs';

import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { UserDataService } from '../../shared/services/user-data.service';

@Component({
	selector: 'app-home-page',
	imports: [RouterOutlet, RouterModule, AppHeaderComponent],
	templateUrl: './home-page.component.html',
	styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
	userService = inject(UserDataService);
	router = inject(Router);
	user = this.userService.lsUserData;

	ngOnInit() {
		this.user.set(this.userService.getData());

		this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(() => this.user.set(this.userService.getData()));
	}
}
