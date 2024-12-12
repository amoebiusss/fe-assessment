import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarlinkStatsComponent } from './starlink-stats.component';

describe('StarlinkStatsComponent', () => {
	let component: StarlinkStatsComponent;
	let fixture: ComponentFixture<StarlinkStatsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [StarlinkStatsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(StarlinkStatsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
