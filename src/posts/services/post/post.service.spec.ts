import { TestBed } from '@angular/core/testing';
import { PostService } from './post.service';
import { HttpClient } from "@angular/common/http";
import { MockHttp } from "../../../app/helpers";
import { UserService } from "../user/user.service";
import { CommentsService } from "../comments/comments.service";
import { posts, postsWithCommentsAndUsers } from "../../mock.api";



describe('PostService', () => {
    let service: PostService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                PostService,
                UserService,
                CommentsService,
                {
                    provide: HttpClient,
                    useClass: MockHttp
                }
            ]
        });
        service = TestBed.inject(PostService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get posts', done => {
        service.getPosts().subscribe(res => {
            expect(res).toEqual(posts)
        }, null, done);
    });

    it('should get posts with comments and users', done => {
        service.getPostsWithCommentsAndUser().subscribe(res => {
            expect(res).toEqual(postsWithCommentsAndUsers)
        }, null, done);
    });
});


