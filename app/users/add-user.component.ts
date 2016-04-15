import {Component, OnInit} from 'angular2/core'
import {ControlGroup, Validators, FormBuilder} from 'angular2/common';
import {CanDeactivate, Router, RouteParams} from 'angular2/router';
import {Http, HTTP_PROVIDERS} from 'angular2/http'

import {AddUserValidators} from './add-userValidators'
import {UsersService} from './users.service'
import {User} from './user'

@Component({
    templateUrl: '/app/users/add-user.component.html',
    providers: [UsersService, Http, HTTP_PROVIDERS]
})
export class AddUserComponent implements CanDeactivate, OnInit {
    form: ControlGroup;
    isEditUser: boolean;
    user = new User();
    
    constructor(
            fb: FormBuilder,
            private _router: Router,
            private _userService: UsersService,
            private _routeParams: RouteParams) {
        
        this.form = fb.group({
            name: ['',
                Validators.compose([Validators.required, Validators.minLength(2)])
            ],
            email: ['',
                Validators.compose([AddUserValidators.isValidEmail])
            ],
            phoneNumber: [''],
            street: [''],
            suite: [''],
            city: [''],
            zipcode: ['']
        });
    }
    
    signup() {
        this._userService.addUser(this.form.value)
            .subscribe(res => {
                    console.log(res);
                },
                err => {
                    console.log(err)
                },
                () => {
                    // this.form.markAsPristine();
                    this._router.navigate(['Users'])
                }
            );
        
    }
    
    routerCanDeactivate(next, previous) {
        if (this.form.dirty) {
            return confirm("Are you sure you want to navigate away? You have unsaved form data.");
        }
        
        return true;    
    }
    
    ngOnInit() {
        var id: string;
        if (id = this._routeParams.get("id")) {
            this._userService.getUser(id)
                .subscribe(user => {
                    this.user = user;
                })
        }
    }
}