import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/data-access/blog.service';
import { BlogPost } from 'src/app/model/blog-post';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  post$: Observable<BlogPost>;
  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.blogService.getPost(+params.get('id')).pipe(
          map((post) => {
            post.img = `https://picsum.photos/id/${post.id}/500/300`;
            return post;
          })
        )
      )
    );
  }
}
