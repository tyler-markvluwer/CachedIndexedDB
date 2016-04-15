import {Component, Input, Output, EventEmitter} from 'angular2/core'

@Component({
    selector: 'pagination',
    templateUrl: 'app/shared/pagination.component.html',
    directives: [],
    providers: [],
    styles: [`
        .disabled {
            cursor: not-allowed;
        }
        
        .highlighted {
            background-color: #0F7864;
        }
    `]
})

export class PaginationComponent {
    @Input('starting-page') activePage: number = 1;
    @Input('num-pages') numPages: number = 5;
    @Output() change = new EventEmitter();
    
    pages: Array<number> = new Array();
    
    constructor() {
        for(var i=1; i <= this.numPages; ++i) {
            this.pages.push(i);
        }
    }
    
    jumpToPage(pageNum: number) {
        if (this.activePage == pageNum) { return; }
        
        this.change.emit({ prevPage: this.activePage, newPage: pageNum })
        this.activePage = pageNum;
    }
    
    nextClick() {
        if (this.activePage == this.numPages) {
            return;
        }
        
        this.jumpToPage(this.activePage + 1);
    }
    
    prevClick() {
        if (this.activePage == 1) {
            return;
        }
        
        this.jumpToPage(this.activePage - 1);
    }
}