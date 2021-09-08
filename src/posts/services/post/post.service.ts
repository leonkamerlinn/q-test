import { Injectable } from '@angular/core';
import { combineLatest, EMPTY, Observable, of } from "rxjs";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { catchError, map, shareReplay, switchMap } from "rxjs/operators";
import { Post } from "../../models/post.interface";
import { Comment } from "../../models/comment.interface";
import { UserService } from "../user/user.service";
import { CommentsService } from "../comments/comments.service";

@Injectable()
export class PostService {
    constructor(
        private http: HttpClient,
        private userService: UserService,
        private commentsService: CommentsService
    ) {
    }

    getPostsWithCommentsAndUser(): Observable<Post[]> {
        return combineLatest([
            this.getPosts(),
            this.commentsService.getComments(),
            this.userService.getUsers()
        ]).pipe(
            map(([posts, comments, users]) => {
                return posts.map((post) => {
                    const postComments = comments.filter(comment => comment.postId === post.id);
                    const postUserIndex = users.map(user => user.id).indexOf(post.userId);
                    return {
                        ...post,
                        comments: postComments,
                        user: postUserIndex === -1 ? undefined : users[postUserIndex]
                    }
                })
            }),
            shareReplay()
        )
    }

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${environment.baseApiUrl}/posts`).pipe(
            shareReplay()
        )
    }

    getPostComments(postId: number): Observable<Comment[]> {
        return this.http.get<Comment[]>(`${environment.baseApiUrl}/posts/${postId}/comments`).pipe(
            shareReplay()
        )
    }

    getPostById(id: number): Observable<Post> {
        return this.http.get<Post>(`${environment.baseApiUrl}/posts/${id}`).pipe(
            shareReplay()
        );
    }

    getPostWithCommentsAndUser(id: number): Observable<Post> {
        const post$ = this.getPostById(id);
        const postComments$ = this.getPostComments(id);
        return combineLatest([post$, postComments$]).pipe(
            switchMap(
                ([post, comments]) => this.userService.getUserById(post.userId).pipe(
                    map((user) => {
                        const postWithCommentsAndUSer: Post = {
                            ...post,
                            comments,
                            user
                        };

                        return postWithCommentsAndUSer;
                    })
                )
            )
        )
    }
}
