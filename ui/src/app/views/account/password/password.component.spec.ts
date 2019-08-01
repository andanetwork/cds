/* tslint:disable:no-unused-variable */

import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {UserService} from '../../../service/user/user.service';
import {AuthentificationStore} from '../../../service/auth/authentification.store';
import {AppModule} from '../../../app.module';
import {PasswordComponent} from './password.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AccountModule} from '../account.module';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('CDS: PasswordComponent', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            providers: [
                {provide: APP_BASE_HREF, useValue: '/'},
                UserService,
                AuthentificationStore,
            ],
            imports: [
                AppModule,
                RouterTestingModule.withRoutes([]),
                AccountModule,
                HttpClientTestingModule
            ]
        });
    });


    it('Reset Password OK', fakeAsync(() => {
        const http = TestBed.get(HttpTestingController);

        // Create loginComponent
        let fixture = TestBed.createComponent(PasswordComponent);
        let component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();

        let compiled = fixture.debugElement.nativeElement;

        // Start detecting change in model
        fixture.detectChanges();
        tick(50);

        // Simulate user typing
        let inputUsername = compiled.querySelector('input[name="username"]');
        inputUsername.value = 'foo';
        inputUsername.dispatchEvent(new Event('input'));

        let inputEmail = compiled.querySelector('input[name="email"]');
        inputEmail.value = 'bar@foo.bar';
        inputEmail.dispatchEvent(new Event('input'));

        // Simulate user click
        compiled.querySelector('#resetPasswordButton').click();

        const req = http.expectOne('http://localhost:8081/user/foo/reset');
        expect(req.request.body.user.username).toBe('foo');
        expect(req.request.body.user.email).toBe('bar@foo.bar');
        req.flush(null);

        expect(fixture.componentInstance.showWaitingMessage).toBeTruthy('Waiting message must be true');

    }));
});
