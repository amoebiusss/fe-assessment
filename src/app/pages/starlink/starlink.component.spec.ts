import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarlinkComponent } from './starlink.component';

describe('StarlinkComponent', () => {
	let component: StarlinkComponent;
	let fixture: ComponentFixture<StarlinkComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [StarlinkComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(StarlinkComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
