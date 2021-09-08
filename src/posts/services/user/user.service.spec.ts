import { TestBed } from '@angular/core/testing';
import { HttpClient } from "@angular/common/http";
import { MockHttp } from "../../../app/helpers";
import { UserService } from "./user.service";
import { users } from "../../mock.api";



describe('UserService', () => {
    let service: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UserService,
                {
                    provide: HttpClient,
                    useClass: MockHttp
                },
            ]
        });
        service = TestBed.inject(UserService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get users', done => {
        service.getUsers().subscribe(res => {
            expect(res).toEqual(users)
        }, null, done);
    });
});

