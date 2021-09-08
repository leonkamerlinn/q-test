import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './containers/post-list/post-list.component';
import { PostDetailComponent } from './containers/post-detail/post-detail.component';
import { RouterModule, Routes } from "@angular/router";
import { SearchFormComponent } from './components/search-form/search-form.component';
import { PostItemComponent } from './components/post-item/post-item.component';
import { ReactiveFormsModule } from "@angular/forms";
import { PostsStore } from "./services/store/posts.store";
import { PostService } from "./services/post/post.service";
import { CommentsService } from "./services/comments/comments.service";
import { UserService } from "./services/user/user.service";
import { CollapseComponent } from './components/collapse/collapse.component';
import { PostDetailGuard } from "./guards/post-detail.guard";



const ROUTES: Routes = [
    {
        path: '',
        component: PostListComponent,
    },
    {
        path: ':id',
        component: PostDetailComponent,
        canActivate: [PostDetailGuard]
    }
]

@NgModule({
    declarations: [
        PostListComponent,
        PostDetailComponent,
        SearchFormComponent,
        PostItemComponent,
        CollapseComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        ReactiveFormsModule
    ],
    providers: [
        PostsStore,
        PostService,
        CommentsService,
        UserService,
        PostDetailGuard
    ],
})
export class PostsModule {
}
