import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import { catchError, distinctUntilChanged, filter, first, map, pluck, switchMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Post } from "../../models/post.interface";
import { PostService } from "../post/post.service";


export interface PostsState {
    searchQuery: string | null
    postId?: number;
    posts: Post[];
    error?: Error;
}

const state: PostsState = {
    searchQuery: null,
    posts: [],
};

@Injectable()
export class PostsStore {
    private subject = new BehaviorSubject<PostsState>(state);
    private store = this.subject.asObservable().pipe(distinctUntilChanged())

    constructor(private service: PostService) {

    }

    get value() {
        return this.subject.value;
    }

    select<T>(name: string): Observable<T> {
        return this.store.pipe(
            pluck(name)
        );
    }

    set(name: string, state: any) {
        this.subject.next({...this.value, [name]: state});
    }


    selectPostById(id: number): Observable<Post | null> {
        return this.select<Post[]>('posts').pipe(
            switchMap((posts) => {
                const postIndex = posts.map(post => post.id).indexOf(id);
                if (postIndex !== -1) {
                    return of(posts[postIndex]);
                }
                return this.service.getPostWithCommentsAndUser(id).pipe(
                    catchError((err) => of(null))
                );
            })
        )
    }


    selectPosts(): Observable<Post[]> {
        const search$ = combineLatest([
            this.select<Post[]>('posts'),
            this.select<string>('searchQuery').pipe(
                filter(query => query !== null),
                map(query => query.trim())
            )
        ]).pipe(
            map(([posts, query]) => {
                return posts.filter((post) => {
                    const titleSearch = post.title.search(query);
                    const bodySearch = post.body.search(query);
                    return titleSearch !== -1 || bodySearch !== -1;
                }).map((post) => {
                    return {
                        ...post,
                        title: post.title.replace(query, `<b class="highlighted">${query}</b>`),
                        body: post.body.replace(query, `<b class="highlighted">${query}</b>`),
                    }
                })
            })
        )

        return this.select<string>('searchQuery').pipe(
            switchMap((query) => query?.length > 0 ? search$ : this.select<Post[]>('posts'))
        )
    }

}
