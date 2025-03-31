import { Component, Input } from '@angular/core';
import { Post } from '../../model/Post';
import { Comment } from '../../model/Comment';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent {
  @Input() postsConComentarios: { post: Post, comments: Comment[] }[] = [];
}
