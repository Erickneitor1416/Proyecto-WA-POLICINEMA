import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileScreenComponent } from './profile-screen.component';
import { LocationService } from '../services/location.service';
import { FirestoreUserService } from '../services/firestore-user.service';
import { of } from 'rxjs';
import { ClarityModule } from '@clr/angular';

fdescribe('ProfileScreenComponent', () => {
	let component: ProfileScreenComponent;
	let fixture: ComponentFixture<ProfileScreenComponent>;
	let locationService: LocationService;
	let firestoreUserService: FirestoreUserService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ProfileScreenComponent],
			imports: [ReactiveFormsModule, ClarityModule],
			providers: [
				{ provide: LocationService, useClass: LocationServiceMock },
				{ provide: FirestoreUserService, useClass: FirestoreUserServiceMock }
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ProfileScreenComponent);
		component = fixture.componentInstance;
		locationService = TestBed.inject(LocationService);
		firestoreUserService = TestBed.inject(FirestoreUserService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should reset user form', () => {
		component.onClickCountry = true;
		component.resetFormUser();
		expect(component.updateForm.controls.country.enabled).toBe(true);
		expect(component.onClickCountry).toBe(false);
		expect(component.updateForm.value).toEqual({ email: null, country: null });
	});

	it('should set country and disable input when obtaining country', () => {
		spyOn(locationService, 'getUserCountry').and.returnValue(of('TestCountry'));
		component.obtenerPais();
		expect(locationService.getUserCountry).toHaveBeenCalled();
		expect(component.updateForm.controls.country.value).toBe('TestCountry');
		expect(component.updateForm.controls.country.disabled).toBe(true);
		expect(component.onClickCountry).toBe(true);
	});

	it('should submit user data', () => {
		spyOn(firestoreUserService, 'updateUser').and.returnValue(Promise.resolve());
		component.updateForm.setValue({ email: 'test@test.com', country: 'TestCountry' });
		component.onSubmitUser();
		expect(firestoreUserService.updateUser).toHaveBeenCalledWith(
			'test@test.com',
			'TestCountry',
			'GvewXAdDwQa8ig7vh73837luls93'
		);
	});

	class LocationServiceMock {
		getUserCountry() {
			return of('TestCountry');
		}
	}

	class FirestoreUserServiceMock {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		updateUser(email: string, country: string, userId: string) {
			return Promise.resolve();
		}
	}
});
