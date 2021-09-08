import { Observable, of } from "rxjs";
import { mockApi } from "../posts/mock.api";

export const createResponse = <T>(url: string): Observable<T | null> => {
    const data = mockApi[url as string];
    return of(data ? data : null)
}

export class MockHttp {
    constructor() {
    }
    get<T>(url: string): Observable<T | null> {
        return createResponse(url);
    }
}
