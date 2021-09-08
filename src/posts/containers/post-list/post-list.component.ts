import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Post } from "../../models/post.interface";
import { PostsStore } from "../../services/store/posts.store";
import { first } from "rxjs/operators";
import { PostService } from "../../services/post/post.service";

@Component({
    selector: 'app-posts',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

    posts$: Observable<Post[]>;
    error$: Observable<Error>;

    constructor(
        public store: PostsStore,
        private service: PostService
    ) {

        service.getPostsWithCommentsAndUser().pipe(
            first()
        ).subscribe(posts => {
            store.set('posts', posts);
            store.set('error', null)
        }, (error: Error) => {
            store.set('error', error)
        })
        this.posts$ = store.selectPosts()
        this.error$ = store.select<Error>('error');
    }

    ngOnInit(): void {
    }

    onSearchQuery(query: string) {
        this.store.set('searchQuery', query);
    }

}
