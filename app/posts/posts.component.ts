import {Component, OnInit} from 'angular2/core'
import {ROUTER_DIRECTIVES} from 'angular2/router'
import {Http} from 'angular2/http'
import {HTTP_PROVIDERS} from 'angular2/http'
import {Observable} from 'rxjs/Observable';

import {PostService} from './post.service'
import {CommentsService} from './comments.service'
import {UsersService} from '../users/users.service'
import {Post} from './post'
import {SpinnerComponent} from '../shared/spinner.component'
import {PaginationComponent} from '../shared/pagination.component'

@Component({
    templateUrl: 'app/posts/posts.component.html',
    directives: [ROUTER_DIRECTIVES, SpinnerComponent, PaginationComponent],
    providers: [PostService, UsersService, CommentsService, Http, HTTP_PROVIDERS],
    styles: [`
        .post-item:hover {
            background-color: lightgray;
        }
        
        .highlighted {
            background-color: lightgray;
        }
        
        .round {
            border-radius: 100%;
        }
        
        .divider {
            border-bottom: 1px solid #ECF0F1;
        }
    `]
})

export class PostsComponent implements OnInit{
    selectedPost = null;
    selectedUser = null;
    comments;
    users;
    postIsLoading = true;
    commentsAreLoading=true;
    posts: Array<Post> = new Array();
    visiblePosts: Array<Post> = new Array();
    numPages = 5;
    postsPerPage = 10;
    
    constructor(
        private _postService: PostService,
        private _commentsService: CommentsService,
        private _usersService: UsersService) {
            
    }
    
    onPageChange(event) {
        var pageNum = event.newPage;
        
        var startIndex = (pageNum - 1) * this.postsPerPage;
        this.visiblePosts = _.take(_.rest(this.posts, startIndex), this.postsPerPage);
    }
    
    filterPostsByUser(user: any) {
        this.selectedUser = user;
        this.postIsLoading = true;
        this._postService.getPostsByUser(user.id)
            .subscribe(posts => {
                this.postIsLoading = false;
                this.posts = posts
                this.onPageChange({ nextPage: 1 });
            });
    }
    
    getPosts() {
        this.selectedUser = null;
        console.log("getting posts");
        
        this._postService.getPosts()
            .subscribe(posts => {
                this.posts = posts;
                this.postIsLoading = false;
                this.visiblePosts = _.take(this.posts, this.postsPerPage);
                // this.onPageChange({newPage: 1});
            });
    }
    
    setSelectedPost(post: Post) {
        this.commentsAreLoading = true;
        this.selectedPost = post;
        
        this._commentsService.getComments(post.id)
            .subscribe(comments => {
                this.comments = comments
                this.commentsAreLoading = false;
            });
    }
    
    ngOnInit() {
        this._usersService.getUsers()
            .subscribe(users => {
                console.log(users);
                this.users = users
            });
        this.getPosts();
    }
}