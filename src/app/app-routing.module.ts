import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { PostDetailComponent } from 'src/app/components/post-detail/post-detail.component';
import { EditPostComponent } from 'src/app/components/edit-post/edit-post.component';
import { CanDeactivateGuard } from './can-deactivate.guard';

const routes: Routes = [
  { path: '', component: PostsListComponent },
  {
    path: 'addpost',
    component: AddPostComponent,
    canDeactivate: [CanDeactivateGuard],
  },
  { path: 'post/:id', component: PostDetailComponent },
  {
    path: 'edit/:id',
    component: EditPostComponent,
    canDeactivate: [CanDeactivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
