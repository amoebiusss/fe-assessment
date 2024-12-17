import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarlinkItemComponent } from './starlink-item.component';

describe('StarlinkItemComponent', () => {
	let component: StarlinkItemComponent;
	let fixture: ComponentFixture<StarlinkItemComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [StarlinkItemComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(StarlinkItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
