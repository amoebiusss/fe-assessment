import { Component, input } from '@angular/core';

const PLACEHOLDER_IMG = '';

@Component({
	selector: 'app-profile-image',
	imports: [],
	templateUrl: './profile-image.component.html',
	styleUrl: './profile-image.component.scss',
})
export class ProfileImageComponent {
	image = input<string>(PLACEHOLDER_IMG);
}
