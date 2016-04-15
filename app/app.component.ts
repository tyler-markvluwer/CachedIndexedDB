import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {NavbarComponent} from './navbar.component'
import {UsersComponent} from './users/users.component'
import {PostsComponent} from './posts/posts.component'
import {HomeComponent} from './home.component'
import {AddUserComponent} from './users/add-user.component'

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

export class AppComponent implements OnInit{
    idbSupported: boolean = false;
    db;
    person = {
        name: "Tyler",
        email: "vluwer@gmail.com",
        created: new Date()
    }
    
    ngOnInit() {
        var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
        if (indexedDB) {
            console.log("db found");
            this.idbSupported = indexedDB;
        }
        
        var openReq = indexedDB.open("test_v2", 2);
        openReq.onupgradeneeded = (e) => {
            console.log("upgrading");
            var thisDb = e.target.result;
            
            if (!thisDb.objectStoreNames.contains("people")) {
                thisDb.createObjectStore("people");
            }
        }
        openReq.onsuccess = (e) => {
            console.log("Success");
            this.db = e.target.result;
            
            // this.savePerson();
            this.getPerson();
        }
        openReq.onerror = (e) => {
            console.log("Error");
            console.dir(e);
        }
    }
    
    savePerson() {
        var transaction = this.db.transaction(["people"], "readwrite");
        var store = transaction.objectStore("people");
        var req = store.add(this.person, 1);
        req.onerror = (e) => console.log("Error", e.target.error.name);
        req.onsuccess = (e) => console.log("save complete")
    }
    
    getPerson() {
        var transaction = this.db.transaction(["people"], "readonly");
        var store = transaction.objectStore("people");
        var obj = store.get(1);
        
        obj.onsuccess = (e) => console.log(e.target.result);
    }
}