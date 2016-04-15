import {Component} from 'angular2/core'
import {Router, ROUTER_DIRECTIVES} from 'angular2/router'

@Component({
    selector: 'navbar',
    templateUrl: '/app/navbar.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class NavbarComponent {
    router: Router;
    constructor(router: Router) {
        this.router = router;
        console.log(router);
        
        console.log()
    }
    
    public isRouteActive(route) {
        return this.router.isRouteActive(this.router.generate(route))
    }
    
}