import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { PostsStore } from "../services/store/posts.store";
import { first, map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class PostDetailGuard implements CanActivate {
    constructor(private store: PostsStore, private router: Router) {
    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.check(route);
    }


    private check(route: ActivatedRouteSnapshot): Observable<boolean> {
        const id = route.paramMap.get('id')
        const isNumber = !isNaN(Number(id));
        if (isNumber) {
            return this.store.selectPostById(Number(id)).pipe(
                first(),
                map((result) => {
                    if (result === null) {
                        this.router.navigateByUrl('/posts')
                    }
                    return result !== null
                })
            )
        }

        this.router.navigateByUrl('/posts')

        return of(false);
    }

}
