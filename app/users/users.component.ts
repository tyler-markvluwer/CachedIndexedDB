import {Component, OnInit} from 'angular2/core'
import {ROUTER_DIRECTIVES} from 'angular2/router'
import {Http} from 'angular2/http'
import {HTTP_PROVIDERS} from 'angular2/http'
import {UsersService} from './users.service'

import {SpinnerComponent} from '../shared/spinner.component'

@Component({
    templateUrl: '/app/users/users.component.html',
    directives: [ROUTER_DIRECTIVES, SpinnerComponent],
    providers: [UsersService, Http, HTTP_PROVIDERS]
})
export class UsersComponent implements OnInit {
    isLoading = true;
    users;
    
    constructor(private _usersService: UsersService) {}
    
    ngOnInit() {
        this._usersService.getUsers()
            .subscribe(users => {
                this.isLoading = false;
                this.users = users;
            })
    }
}