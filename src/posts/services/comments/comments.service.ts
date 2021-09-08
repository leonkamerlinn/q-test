import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { shareReplay } from "rxjs/operators";
import { Comment } from "../../models/comment.interface";

@Injectable()
export class CommentsService {

    constructor(private http: HttpClient) {
    }

    getComments(): Observable<Comment[]> {
        return this.http.get<Comment[]>(`${environment.baseApiUrl}/comments`).pipe(
            shareReplay()
        )
    }
}
