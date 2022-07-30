import { Post } from 'src/entities/Post.entity';

export class PostsDocument extends Post {
  static collectionName = 'posts';
}
