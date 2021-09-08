import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { fromEvent, interval, Observable, ReplaySubject } from "rxjs";
import { debounce, distinctUntilChanged, map, takeUntil } from "rxjs/operators";


@Component({
    selector: 'search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit, AfterViewInit, OnDestroy {
    private destroySubject: ReplaySubject<void> = new ReplaySubject<void>();
    @ViewChild('search', {static: true}) input?: ElementRef;

    @Output()
    query: EventEmitter<string> = new EventEmitter<string>();

    form = this.fb.group({
        query: ['', Validators.required],
    });

    constructor(private fb: FormBuilder) {
    }

    ngOnDestroy(): void {
        this.destroySubject.next();
        this.destroySubject.complete();
    }

    ngOnInit(): void {
    }

    get destroy$(): Observable<void> {
        return this.destroySubject.asObservable();
    }

    ngAfterViewInit(): void {
        fromEvent(this.input?.nativeElement, 'input').pipe(
            takeUntil(this.destroy$),
            debounce(() => interval(300)),
            map((e: any) => e.target.value),
            distinctUntilChanged(),
        ).subscribe(value => this.query.emit(value));
    }



    get queryControl(): FormControl {
        return this.form.get('query') as FormControl;
    }


}
