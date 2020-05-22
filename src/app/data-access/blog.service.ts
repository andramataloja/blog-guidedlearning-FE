import { BlogPost } from './../model/blog-post';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private postsUrl: string;
  constructor(private http: HttpClient) {
    this.postsUrl = 'http://localhost:8080/posts';
  }
  public getPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.postsUrl);
  }
  public addPost(post: BlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(this.postsUrl, post);
  }

  public getPost(id: number): Observable<BlogPost> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get<BlogPost>(url);
  }

  public editPost(post: BlogPost): Observable<any> {
    const url = `${this.postsUrl}/${post.id}`;
    return this.http.put(url, post);
  }

  public deletePost(post: BlogPost): Observable<any> {
    const url = `${this.postsUrl}/${post.id}`;
    return this.http.delete<BlogPost>(url);
  }
}
