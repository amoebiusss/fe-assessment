import { Component, inject, signal, effect } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

import { DataService } from './services/data-service/data.service';
import { PaginatedStarlinkInfo, StarlinkInfo } from '../../shared/interfaces/starlink';
import { StarlinkItemGroupComponent } from './starlink-item/starlink-item.component';

const DEFAULT_PAGE_INDEX = 1;
const DEFAULT_PAGE_SIZE = 10;

@Component({
	selector: 'app-starlink-stats',
	imports: [RouterModule, StarlinkItemGroupComponent, UpperCasePipe],
	providers: [DataService],
	templateUrl: './starlink-stats.component.html',
})
export class StarlinkStatsComponent {
	dataService = inject(DataService);

	three = signal<StarlinkInfo[] | null>(null);
	five = signal<StarlinkInfo[] | null>(null);
	threeAndFive = signal<StarlinkInfo[] | null>(null);
	norThreeNeitherFive = signal<StarlinkInfo[] | null>(null);

	minPageIndex = DEFAULT_PAGE_INDEX;
	currentPageIndex = signal<number>(DEFAULT_PAGE_INDEX);
	pageSize = signal<number>(DEFAULT_PAGE_SIZE);
	next = signal<boolean>(true);
	totalPages = signal<number | undefined>(DEFAULT_PAGE_INDEX);

	starlinkInfo = toSignal<PaginatedStarlinkInfo>(
		toObservable(this.currentPageIndex).pipe(switchMap(index => this.dataService.getStarlinkStatsPerPage(index))),
		{ initialValue: null }
	);

	constructor() {
		effect(() => {
			const starlinks = this.starlinkInfo();

			this.three.set(null);
			this.five.set(null);
			this.threeAndFive.set(null);
			this.norThreeNeitherFive.set(null);
			this.totalPages.set(starlinks?.totalPages);

			if (starlinks) {
				this.categorizeStarlinks(starlinks?.docs);
			}
		});
	}

	onPageChange(pageNumber: number): void {
		if (pageNumber >= this.minPageIndex && pageNumber <= (this.totalPages() || DEFAULT_PAGE_INDEX)) {
			this.currentPageIndex.set(pageNumber);
		} else {
			return;
		}
	}

	onPageSizeChange(pageNumber: number) {
		this.currentPageIndex.set(pageNumber);
	}

	onLoadMoreItems(currentPageIndex: number) {
		if (this.next()) {
			this.currentPageIndex.set(currentPageIndex + 1);
		} else {
			return;
		}
	}

	private categorizeStarlinks(starlinks: StarlinkInfo[]): void {
		const divisibleByThree: StarlinkInfo[] = [];
		const divisibleByFive: StarlinkInfo[] = [];
		const divisibleByThreeAndFive: StarlinkInfo[] = [];
		const notDivisibleByThreeOrFive: StarlinkInfo[] = [];

		starlinks.forEach(starlink => {
			const roundedHeight = Math.round(starlink.heightKilometers);

			if (roundedHeight % 3 === 0 && roundedHeight % 5 === 0) {
				divisibleByThreeAndFive.push(starlink);
			} else {
				notDivisibleByThreeOrFive.push(starlink);
			}

			if (roundedHeight % 3 === 0) {
				divisibleByThree.push(starlink);
			} else if (roundedHeight % 5 === 0) {
				divisibleByFive.push(starlink);
			}
		});

		this.three.set(divisibleByThree);
		this.five.set(divisibleByFive);
		this.threeAndFive.set(divisibleByThreeAndFive);
		this.norThreeNeitherFive.set(notDivisibleByThreeOrFive);
	}
}
