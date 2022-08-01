import { User } from '../../entities/User.entity';

export class UsersDocument extends User {
  static collectionName = 'users';
}
