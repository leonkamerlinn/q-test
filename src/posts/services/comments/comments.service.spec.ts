import { TestBed } from '@angular/core/testing';
import { HttpClient } from "@angular/common/http";
import { CommentsService } from './comments.service';
import { MockHttp } from "../../../app/helpers";
import { comments } from "../../mock.api";




describe('CommentsService', () => {
    let service: CommentsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CommentsService,
                {
                    provide: HttpClient,
                    useClass: MockHttp
                },
            ]
        });
        service = TestBed.inject(CommentsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get comments', done => {
        service.getComments().subscribe(res => {
            expect(res).toEqual(comments)
        }, null, done);
    });
});
