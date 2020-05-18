import { BlogPost } from './../../model/blog-post';
import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/data-access/blog.service';
import { Observable, from } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  posts$: Observable<BlogPost[]>;

  constructor(
    private blogService: BlogService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  private fetchPosts() {
    this.posts$ = from(
      this.blogService
        .getPosts()
        .then(this.sortByDescending)
        .then((posts) => {
          posts.forEach((post) => {
            post.img = `https://picsum.photos/id/${post.id}/500/300`;
          });
          return posts;
        })
    );
  }

  private fetchPostsOldest() {
    this.posts$ = from(
      this.blogService
        .getPosts()
        .then(this.sortByAscending)
        .then((posts) => {
          posts.forEach((post) => {
            post.img = `https://picsum.photos/id/${post.id}/500/300`;
          });
          return posts;
        })
    );
  }

  private sortByDescending = (posts) => {
    return posts.sort((a, b) => {
      return (new Date(b.createdAt) as any) - (new Date(a.createdAt) as any);
    });
  };

  private sortByAscending = (posts) => {
    return posts.sort((a, b) => {
      return (new Date(a.createdAt) as any) - (new Date(b.createdAt) as any);
    });
  };

  sortPosts(sortParameter): void {
    sortParameter === 'oldest' ? this.fetchPostsOldest() : this.fetchPosts();
  }

  deletePost(post: BlogPost): void {
    this.blogService.deletePost(post).then(() => {
      this.fetchPosts();
      this.snackBar.open('Blog post deleted successfully', '', {
        duration: 2000,
      });
    });
  }
}
