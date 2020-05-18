import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/data-access/blog.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, from } from 'rxjs';
import { BlogPost } from 'src/app/model/blog-post';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from 'src/app/can-deactivate.guard';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit, CanComponentDeactivate {
  post$: Observable<BlogPost>;
  public editForm: FormGroup;
  private postId: string;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  form = {
    title: '',
    content: '',
  };
  saved = false;

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (
      (this.form.title.length > 0 || this.form.content.length > 0) &&
      !this.saved
    ) {
      return confirm('Your changes are unsaved! Do you like to exit?');
    }
    return true;
  }

  ngOnInit(): void {
    this.post$ = from(
      this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>
          this.blogService.getPost(params.get('id')).then((post) => {
            this.postId = params.get('id');

            this.editForm = this.fb.group({
              title: [post.title ? post.title : '', Validators.required],
              content: [post.content ? post.content : '', Validators.required],
            });
            this.form = {
              title: post.title,
              content: post.content,
            };
            return post;
          })
        )
      )
    );
  }

  editPost(): void {
    this.saved = true;
    const edited = this.editForm.value;
    edited.id = parseInt(this.postId);
    edited.createdAt = new Date().toISOString();
    this.blogService.editPost(edited).then(
      (id) => {
        const snackBarRef = this.snackBar.open(
          'Blog post edited successfully',
          '',
          {
            duration: 1000,
          }
        );
        snackBarRef.afterDismissed().subscribe(() => {
          this.router.navigate(['/']);
        });
      },
      (error) => console.log('Error occured while editing post ', error)
    );
  }
}
