import { NavigationComponent } from './../components/navigation/navigation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPostComponent } from '../components/add-post/add-post.component';
import { PostsListComponent } from '../components/posts-list/posts-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { dbConfig } from 'src/environments/environment';
import { PostDetailComponent } from 'src/app/components/post-detail/post-detail.component';
import { EditPostComponent } from 'src/app/components/edit-post/edit-post.component';

@NgModule({
  declarations: [
    AddPostComponent,
    PostsListComponent,
    NavigationComponent,
    PostDetailComponent,
    EditPostComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AppRoutingModule,
    NgxIndexedDBModule.forRoot(dbConfig),
  ],
  exports: [
    AppRoutingModule,
    NgxIndexedDBModule,
    NavigationComponent,
    FormsModule,
  ],
})
export class CoreModule {}
