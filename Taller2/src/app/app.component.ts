import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, forkJoin } from 'rxjs';
import { User } from './model/User';
import { Post } from './model/Post';
import { Comment } from './model/Comment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  txtUser = '';
  usuario: User | null = null;
  postsConComentarios: { post: Post, comments: Comment[] }[] = [];

  constructor(private http: HttpClient) {}

  searchUser() {
    this.http.get<{ users: User[] }>(`https://dummyjson.com/users/filter?key=username&value=${this.txtUser}`)
      .pipe(
        switchMap(res => {
          if (res.users.length === 0) throw new Error('Usuario no encontrado');
          this.usuario = res.users[0];
          return this.http.get<{ posts: Post[] }>(`https://dummyjson.com/posts/user/${this.usuario.id}`);
        }),
        switchMap(res => {
          const posts = res.posts;
          const requests = posts.map(post =>
            this.http.get<{ comments: Comment[] }>(`https://dummyjson.com/comments/post/${post.id}`)
              .pipe(switchMap(c => [{ post, comments: c.comments }]))
          );
          return forkJoin(requests);
        })
      )
      .subscribe({
        next: (res) => {
          this.postsConComentarios = res;
        },
        error: (err) => {
          this.usuario = null;
          this.postsConComentarios = [];
          alert(err.message);
        }
      });
  }
}
