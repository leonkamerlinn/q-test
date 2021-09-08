import { TestBed } from '@angular/core/testing';
import { PostsStore } from "./posts.store";
import { PostService } from "../post/post.service";
import { UserService } from "../user/user.service";
import { CommentsService } from "../comments/comments.service";
import { HttpClient } from "@angular/common/http";
import { MockHttp } from "../../../app/helpers";
import { first, map } from "rxjs/operators";
import { TestScheduler } from "rxjs/testing";
import { highlightedFirstPost, posts, postsWithCommentsAndUsers } from "../../mock.api";
import { combineLatest } from "rxjs";



describe('PostsStore', () => {
    let store: PostsStore;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                PostsStore,
                PostService,
                UserService,
                CommentsService,
                {
                    provide: HttpClient,
                    useClass: MockHttp
                }
            ]
        });
        store = TestBed.inject(PostsStore);
        store.set('posts', postsWithCommentsAndUsers);
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        })
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
    });

    it('should get all posts', () => {
        testScheduler.run(helpers => {
            const {expectObservable} = helpers;

            const posts$ = store.selectPosts().pipe(
                first()
            )

            const searchQuery$ = store.select<string>('searchQuery').pipe(
                first()
            );

            const diagram = '(a|)';
            const expected = {a: [postsWithCommentsAndUsers, null]};

            expectObservable(combineLatest([
                posts$, searchQuery$
            ])).toBe(diagram, expected);
        });
    });

    it('should get first post',() => {
        testScheduler.run(helpers => {
            const {expectObservable} = helpers;
            const searchQuery = '#1';
            store.set('searchQuery', searchQuery)

            const posts$ = store.selectPosts().pipe(
                first()
            )

            const searchQuery$ = store.select<string>('searchQuery').pipe(
                first()
            );

            const diagram = '(a|)';
            const expected = {a: [[highlightedFirstPost], searchQuery]};

            expectObservable(combineLatest([
                posts$, searchQuery$
            ])).toBe(diagram, expected);
        });
    });
});


