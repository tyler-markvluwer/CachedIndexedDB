System.register(['angular2/core', 'angular2/router', 'angular2/http', './post.service', './comments.service', '../users/users.service', '../shared/spinner.component', '../shared/pagination.component'], function(exports_1, context_1) {
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
    var core_1, router_1, http_1, http_2, post_service_1, comments_service_1, users_service_1, spinner_component_1, pagination_component_1;
    var PostsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (post_service_1_1) {
                post_service_1 = post_service_1_1;
            },
            function (comments_service_1_1) {
                comments_service_1 = comments_service_1_1;
            },
            function (users_service_1_1) {
                users_service_1 = users_service_1_1;
            },
            function (spinner_component_1_1) {
                spinner_component_1 = spinner_component_1_1;
            },
            function (pagination_component_1_1) {
                pagination_component_1 = pagination_component_1_1;
            }],
        execute: function() {
            PostsComponent = (function () {
                function PostsComponent(_postService, _commentsService, _usersService) {
                    this._postService = _postService;
                    this._commentsService = _commentsService;
                    this._usersService = _usersService;
                    this.selectedPost = null;
                    this.selectedUser = null;
                    this.postIsLoading = true;
                    this.commentsAreLoading = true;
                    this.posts = new Array();
                    this.visiblePosts = new Array();
                    this.numPages = 5;
                    this.postsPerPage = 10;
                }
                PostsComponent.prototype.onPageChange = function (event) {
                    var pageNum = event.newPage;
                    var startIndex = (pageNum - 1) * this.postsPerPage;
                    this.visiblePosts = _.take(_.rest(this.posts, startIndex), this.postsPerPage);
                };
                PostsComponent.prototype.filterPostsByUser = function (user) {
                    var _this = this;
                    this.selectedUser = user;
                    this.postIsLoading = true;
                    this._postService.getPostsByUser(user.id)
                        .subscribe(function (posts) {
                        _this.postIsLoading = false;
                        _this.posts = posts;
                        _this.onPageChange({ nextPage: 1 });
                    });
                };
                PostsComponent.prototype.getPosts = function () {
                    var _this = this;
                    this.selectedUser = null;
                    console.log("getting posts");
                    this._postService.getPosts()
                        .subscribe(function (posts) {
                        _this.posts = posts;
                        _this.postIsLoading = false;
                        _this.visiblePosts = _.take(_this.posts, _this.postsPerPage);
                        // this.onPageChange({newPage: 1});
                    });
                };
                PostsComponent.prototype.setSelectedPost = function (post) {
                    var _this = this;
                    this.commentsAreLoading = true;
                    this.selectedPost = post;
                    this._commentsService.getComments(post.id)
                        .subscribe(function (comments) {
                        _this.comments = comments;
                        _this.commentsAreLoading = false;
                    });
                };
                PostsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._usersService.getUsers()
                        .subscribe(function (users) {
                        console.log(users);
                        _this.users = users;
                    });
                    this.getPosts();
                };
                PostsComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/posts/posts.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES, spinner_component_1.SpinnerComponent, pagination_component_1.PaginationComponent],
                        providers: [post_service_1.PostService, users_service_1.UsersService, comments_service_1.CommentsService, http_1.Http, http_2.HTTP_PROVIDERS],
                        styles: ["\n        .post-item:hover {\n            background-color: lightgray;\n        }\n        \n        .highlighted {\n            background-color: lightgray;\n        }\n        \n        .round {\n            border-radius: 100%;\n        }\n        \n        .divider {\n            border-bottom: 1px solid #ECF0F1;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [post_service_1.PostService, comments_service_1.CommentsService, users_service_1.UsersService])
                ], PostsComponent);
                return PostsComponent;
            }());
            exports_1("PostsComponent", PostsComponent);
        }
    }
});
//# sourceMappingURL=posts.component.js.map