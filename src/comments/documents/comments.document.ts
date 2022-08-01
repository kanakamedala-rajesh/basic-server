import { Comment } from '../../entities/Comment.entity';

export class CommentsDocument extends Comment {
  static collectionName = 'comments';
}
