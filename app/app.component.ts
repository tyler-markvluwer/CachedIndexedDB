import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {NavbarComponent} from './navbar.component'
import {UsersComponent} from './users/users.component'
import {PostsComponent} from './posts/posts.component'
import {HomeComponent} from './home.component'
import {AddUserComponent} from './users/add-user.component'
import {IndexedDbHelper} from './shared/indexed-db-helper'

@RouteConfig([
    {path: '/users', name: 'Users', component: UsersComponent},
    {path: '/posts', name: 'Posts', component: PostsComponent},
    {path: '/users/new', name: "AddUser", component: AddUserComponent},
    {path: '/', name: 'Home', component: HomeComponent},
    {path: '/*other', name: 'Other', redirectTo: ['Home']}
])
@Component({
    selector: 'my-app',
    templateUrl: '/app/app.component.html',
    directives: [ROUTER_DIRECTIVES, NavbarComponent]
})

export class AppComponent {
    dbHelper;

    constructor() {
        this.dbHelper = new IndexedDbHelper();
    }
}