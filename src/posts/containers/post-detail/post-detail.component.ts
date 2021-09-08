import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PostsStore } from "../../services/store/posts.store";
import { Observable, ReplaySubject } from "rxjs";
import { Post } from "../../models/post.interface";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap, takeUntil } from "rxjs/operators";

@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, AfterViewInit {
    private destroySubject: ReplaySubject<void> = new ReplaySubject<void>();
    post$: Observable<Post | null>;

    constructor(private store: PostsStore, private activatedRoute: ActivatedRoute) {
        const id$: Observable<number> = this.activatedRoute.params.pipe(
            takeUntil(this.destroy$),
            map(({id}) => Number(id))
        );

        this.post$ = id$.pipe(
            switchMap(id => store.selectPostById(id))
        );

    }

    get destroy$(): Observable<void> {
        return this.destroySubject.asObservable();
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.destroySubject.next();
        this.destroySubject.complete();
    }

}
