import { User } from 'src/entities/User.entity';

export class UsersDocument extends User {
  static collectionName = 'users';
}
