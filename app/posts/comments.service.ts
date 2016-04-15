import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CommentsService {
    private _url="http://jsonplaceholder.typicode.com/comments"
    
    constructor(private _http: Http) {
    }
    
    getComments(id: Number): Observable<any> {
        return this._http.get(this._url + "?postId=" + id)
            .map(res => res.json());
    }
    
}