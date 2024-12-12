import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLaunchesComponent } from './profile-launches.component';

describe('ProfileLaunchesComponent', () => {
  let component: ProfileLaunchesComponent;
  let fixture: ComponentFixture<ProfileLaunchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileLaunchesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileLaunchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
