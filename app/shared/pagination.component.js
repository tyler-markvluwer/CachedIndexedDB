System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var PaginationComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            PaginationComponent = (function () {
                function PaginationComponent() {
                    this.activePage = 1;
                    this.numPages = 5;
                    this.change = new core_1.EventEmitter();
                    this.pages = new Array();
                    for (var i = 1; i <= this.numPages; ++i) {
                        this.pages.push(i);
                    }
                }
                PaginationComponent.prototype.jumpToPage = function (pageNum) {
                    if (this.activePage == pageNum) {
                        return;
                    }
                    this.change.emit({ prevPage: this.activePage, newPage: pageNum });
                    this.activePage = pageNum;
                };
                PaginationComponent.prototype.nextClick = function () {
                    if (this.activePage == this.numPages) {
                        return;
                    }
                    this.jumpToPage(this.activePage + 1);
                };
                PaginationComponent.prototype.prevClick = function () {
                    if (this.activePage == 1) {
                        return;
                    }
                    this.jumpToPage(this.activePage - 1);
                };
                __decorate([
                    core_1.Input('starting-page'), 
                    __metadata('design:type', Number)
                ], PaginationComponent.prototype, "activePage", void 0);
                __decorate([
                    core_1.Input('num-pages'), 
                    __metadata('design:type', Number)
                ], PaginationComponent.prototype, "numPages", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], PaginationComponent.prototype, "change", void 0);
                PaginationComponent = __decorate([
                    core_1.Component({
                        selector: 'pagination',
                        templateUrl: 'app/shared/pagination.component.html',
                        directives: [],
                        providers: [],
                        styles: ["\n        .disabled {\n            cursor: not-allowed;\n        }\n        \n        .highlighted {\n            background-color: #0F7864;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [])
                ], PaginationComponent);
                return PaginationComponent;
            }());
            exports_1("PaginationComponent", PaginationComponent);
        }
    }
});
//# sourceMappingURL=pagination.component.js.map