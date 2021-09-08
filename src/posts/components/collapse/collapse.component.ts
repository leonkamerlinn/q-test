import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'collapse',
    templateUrl: './collapse.component.html',
    styleUrls: [ './collapse.component.scss' ]
})
export class CollapseComponent implements OnInit {
    @Input()
    collapsed = true;

    constructor() {
    }

    ngOnInit(): void {
    }

    toggle() {
        this.collapsed = !this.collapsed;
    }
}
