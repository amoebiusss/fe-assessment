import { Component, effect, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';

import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { DataService } from '../starlink-stats/services/data-service/data.service';
import { LaunchItem, Payload } from '../../shared/interfaces';

@Component({
	selector: 'app-starlink',
	imports: [RouterModule, DatePipe, LoaderComponent],
	providers: [DataService],
	templateUrl: './starlink.component.html',
	styleUrl: './starlink.component.scss',
})
export class StarlinkComponent {
	dataService = inject(DataService);

	private params = inject(ActivatedRoute).params.pipe(map(res => res['id']));
	launchId = signal<string | null>(null);

	id = toSignal(this.params);
	starlinkInfo = toSignal(this.dataService.getStarlinkById(this.id()))
	launchInfo = toSignal<LaunchItem>(
		toObservable(this.launchId).pipe(filter(Boolean), switchMap(id => this.dataService.getLaunchStats(id))),
		{ initialValue: null }
	);

	constructor() {
		effect(() => {
			const starlinkInfo = this.starlinkInfo();
			this.launchId.set(starlinkInfo?.launchId || null);
		});
	}

	combinedPayloadsMass(payloads: Payload[]): number {
		return payloads.reduce((prev, curr) => (prev + curr.mass_kg), 0)
	}
}
