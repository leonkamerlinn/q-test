import { Component, Input, OnInit } from '@angular/core';
import { Post } from "../../models/post.interface";

@Component({
    selector: 'post-item',
    templateUrl: './post-item.component.html',
    styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {
    @Input()
    post?: Post | null;

    constructor() {
    }

    ngOnInit(): void {
    }


}
