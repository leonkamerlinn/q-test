import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { shareReplay } from "rxjs/operators";
import { User } from "../../models/user.interface";

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.baseApiUrl}/users`).pipe(
            shareReplay()
        )
    }

    getUserById(id: number): Observable<User> {
        return this.http.get<User>(`${environment.baseApiUrl}/users/${id}`).pipe(
            shareReplay()
        )
    }
}
