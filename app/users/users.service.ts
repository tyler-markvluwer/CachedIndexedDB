import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UsersService {
    private _url = "http://jsonplaceholder.typicode.com/users"
    
    constructor(private _http: Http) {
        // inentionally blank
    }
    
    getUsers() : Observable<any> {
        return this._http.get(this._url)
            .map(res => res.json());
    }
    
    getUser(id: string) {
        return this._http.get(this._url + '/' + id)
            .map(res => res.json());
    }
    
    addUser(userObject) : Observable<any> {
        return this._http.post(this._url, userObject.toString())
            .map(res => res.json());
    }
}