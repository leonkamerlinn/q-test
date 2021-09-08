import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

const ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/posts',
        pathMatch: 'full'
    },
    {
        path: 'posts',
        loadChildren: () => import('../posts/posts.module').then(m => m.PostsModule)
    },
]

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(ROUTES)
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
