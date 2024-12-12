import { Component, inject, signal, effect } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataService } from './services/data-service/data.service'
import { toSignal } from '@angular/core/rxjs-interop';
import { StarlinkInfo } from '../../shared/interfaces/starlink';

@Component({
	selector: 'app-starlink-stats',
	imports: [DecimalPipe, DatePipe, RouterModule],
	providers: [DataService],
	templateUrl: './starlink-stats.component.html',
	styleUrl: './starlink-stats.component.scss',
})
export class StarlinkStatsComponent {
	// TODO: add pagination logic
	source$ = inject(DataService).getStarlinkStatsPerPage(1);
	starlinks = toSignal(this.source$);

	three = signal<StarlinkInfo[]>([]);
	five = signal<StarlinkInfo[]>([]);
	threeAndFive = signal<StarlinkInfo[]>([]);
	norThreeNeitherFive = signal<StarlinkInfo[]>([]);
	
	constructor() {
		effect(() => {
		  const starlinks = this.starlinks();
	
		  this.three.set([]);
		  this.five.set([]);
		  this.threeAndFive.set([]);
		  this.norThreeNeitherFive.set([]);
	
		  if (starlinks) {
			this.categorizeStarlinks(starlinks.docs);
		  }
		});
	}
	
	// TODO: reconsider approach
	categorizeStarlinks(starlinks: StarlinkInfo[]): void {
		const divisibleByThree: StarlinkInfo[] = [];
		const divisibleByFive: StarlinkInfo[] = [];
		const divisibleByThreeAndFive: StarlinkInfo[] = [];
		const notDivisibleByThreeOrFive: StarlinkInfo[] = [];

		starlinks.forEach((starlink) => {
			const roundedHeight = Math.round(starlink.height_km);
	  
			if (roundedHeight % 3 === 0 && roundedHeight % 5 === 0) {
			  divisibleByThreeAndFive.push(starlink);
			} else if (roundedHeight % 3 === 0) {
			  divisibleByThree.push(starlink);
			} else if (roundedHeight % 5 === 0) {
			  divisibleByFive.push(starlink);
			} else {
			  notDivisibleByThreeOrFive.push(starlink);
			}
		});

		this.three.set(divisibleByThree);
		this.five.set(divisibleByFive);
		this.threeAndFive.set(divisibleByThreeAndFive);
		this.norThreeNeitherFive.set(notDivisibleByThreeOrFive);
	}

}
