import { BlogPost } from './../model/blog-post';
import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private dbService: NgxIndexedDBService) {}

  public addPost(post: BlogPost): Promise<Number> {
    return this.dbService.add<BlogPost>('posts', post);
  }

  public getPosts(): Promise<BlogPost[]> {
    return this.dbService.getAll<BlogPost>('posts');
  }

  public getPost(id: string): Promise<BlogPost> {
    const key = parseInt(id);
    return this.dbService.getByKey('posts', key);
  }

  public deletePost(post: BlogPost): Promise<any> {
    return this.dbService.delete('posts', post.id);
  }

  public editPost(post: BlogPost): Promise<Number> {
    return this.dbService.update<BlogPost>('posts', post);
  }
}
