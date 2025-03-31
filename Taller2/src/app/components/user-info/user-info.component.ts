import { Component, Input } from '@angular/core';
import { User } from '../../model/User';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {
  @Input() usuario!: User;
}
