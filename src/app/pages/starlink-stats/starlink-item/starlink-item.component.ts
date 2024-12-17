import { Component, input } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { StarlinkInfo } from '../../../shared/interfaces';

@Component({
	selector: 'app-starlink-group-item',
	imports: [DecimalPipe, DatePipe, RouterModule, LoaderComponent],
	templateUrl: './starlink-item.component.html',
})
export class StarlinkItemGroupComponent {
	items = input<StarlinkInfo[] | null>(null);
	itemGroupTitle = input<string>('');
}
