import { Comment } from 'src/entities/Comment.entity';

export class CommentsDocument extends Comment {
  static collectionName = 'comments';
}
