import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']

})
export class PostListComponent implements OnInit, OnDestroy{
    // posts = [
    //     {title: "First Post", content: "This is the first post 's content"},
    //     {title: "Second Post", content: "This is the second post 's content"},
    //     {title: "Third Post", content: "This is the third post 's content"},

    // ]
    posts:Post[] = [];
    isLoading = false;
    totalPosts = 10;
    postsPerPage = 2;
    currentPage = 1;
    pageSizeOptions = [1,2,5,10];
    userIsAuthenticated = false;
    userId: string;
    private postsSub: Subscription;
    private authStatusSub: Subscription

    constructor(public postsService: PostsService, private authService: AuthService ){
    }

    
    ngOnDestroy() {
        this.postsSub.unsubscribe();
        this.authStatusSub.unsubscribe();
    }

    onDelete(postId: string) {
        this.isLoading = true;
        this.postsService.deletePost(postId);
        this.isLoading = false;
      }

    onChangedPage(pageData: PageEvent){
        this.currentPage = pageData.pageIndex + 1;
        this.postsPerPage = pageData.pageSize;
        this.postsService.getPosts(this.postsPerPage, this.currentPage);

    }

    ngOnInit(){
        this.isLoading = true;
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
        this.userId = this.authService.getUserId();
        this.postsSub = this.postsService.getPostsUpdateListener().
            subscribe((posts: Post[]) => {
                this.isLoading = false;
                this.posts = posts;
            })
            this.userIsAuthenticated = this.authService.getIsAuth();
            this.authStatusSub = this.authService.getAuthStatusListener()
                .subscribe(isAuthenticated => {
                    this.userIsAuthenticated = isAuthenticated;
                    this.userId = this.authService.getUserId();
                });
    }

}