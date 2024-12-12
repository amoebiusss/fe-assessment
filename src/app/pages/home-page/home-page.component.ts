import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';

@Component({
	selector: 'app-home-page',
	imports: [RouterOutlet, AppHeaderComponent],
	templateUrl: './home-page.component.html',
	styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}