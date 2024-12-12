import { Routes } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { StarlinkStatsComponent } from './pages/starlink-stats/starlink-stats.component';
import { StarlinkComponent } from './pages/starlink/starlink.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

export const routes: Routes = [
	{ path: '', redirectTo: '/user-profile', pathMatch: 'full' },
	{
		path: '',
		component: HomePageComponent,
		children: [
			{ path: '', component: UserProfileComponent },
			{ path: 'user-profile/:id', component: UserProfileComponent },
			{ path: 'user-profile', component: UserProfileComponent },
			{ path: 'starlink-stats', component: StarlinkStatsComponent },
			{ path: 'starlink/:id', component: StarlinkComponent },
		],
	},
	{ path: '**', component: ErrorPageComponent },
];
