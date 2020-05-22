import { BlogService } from './../../data-access/blog.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from 'src/app/can-deactivate.guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit, CanComponentDeactivate {
  public postForm: FormGroup;
  constructor(
    private blogService: BlogService,
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
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  addPost(): void {
    this.saved = true;
    const post = this.postForm.value;
    post.createdAt = new Date().toISOString();
    this.blogService.addPost(post).subscribe(
      (id) => {
        const snackBarRef = this.snackBar.open(
          'Blog post created successfully',
          '',
          {
            duration: 1000,
          }
        );
        snackBarRef.afterDismissed().subscribe(() => {
          this.router.navigate(['/']);
        });
      },
      (error) => console.log('Error occured while saving post ', error)
    );
  }
}
