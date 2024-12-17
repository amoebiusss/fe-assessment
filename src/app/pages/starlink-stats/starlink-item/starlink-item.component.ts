import { Component, inject, input } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { StarlinkInfo } from '../../../shared/interfaces';
import { DataService } from '../services/data-service/data.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-starlink-group-item',
  imports: [DecimalPipe, DatePipe, RouterModule, LoaderComponent],
	providers: [DataService],
  templateUrl: './starlink-item.component.html',
})
export class StarlinkItemGroupComponent {
  items = input<StarlinkInfo[] | null>(null);
  itemGroupTitle = input<string>('');
}
