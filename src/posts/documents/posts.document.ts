import { Post } from '../../entities/Post.entity';

export class PostsDocument extends Post {
  static collectionName = 'posts';
}
