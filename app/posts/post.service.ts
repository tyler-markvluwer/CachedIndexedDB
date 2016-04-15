import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PostService {
    private _url = "http://jsonplaceholder.typicode.com/posts";
    
    constructor(private _http: Http) {
    }
    
    getPosts(): Observable<any> {
        return this._http.get(this._url)
            .map(res => res.json());
    }
    
    getPostsByUser(id: Number): Observable<any> {
        return this._http.get(this._url + "?userId=" + id)
            .map(res => res.json());
    }
}