import { Inject, Injectable, Logger } from '@nestjs/common';
import { CollectionReference } from 'firebase-admin/firestore';
import { Comment } from 'src/entities/Comment.entity';
import { CommentsDocument } from './documents/comments.document';

@Injectable()
export class CommentsService {
  private logger: Logger = new Logger(CommentsService.name);

  constructor(
    @Inject(CommentsDocument.collectionName)
    private commentsCollection: CollectionReference<CommentsDocument>,
  ) {}

  async initializeComments(comments: Comment[]): Promise<CommentsDocument[]> {
    this.logger.log(
      `Initializing Comments document with ${comments.length} comments`,
    );

    const createdComments: Comment[] = [];
    for (const comment of comments) {
      const createdDocument = await this.create(comment);
      createdComments.push(createdDocument);
    }
    return createdComments;
  }

  async create(comment: Comment): Promise<CommentsDocument> {
    this.logger.log(`Creating comment: ${comment.name}`);
    const docRef = this.commentsCollection.doc(comment.id.toString());
    await docRef.set(comment);
    const todoDoc = await docRef.get();
    const todo = todoDoc.data();
    return todo;
  }

  async getComments(): Promise<CommentsDocument[]> {
    this.logger.log('Getting comments');
    const snapshot = await this.commentsCollection.get();
    const comments: CommentsDocument[] = [];
    snapshot.forEach((doc) => {
      this.logger.debug(`Found comment: ${doc.id}`);
      comments.push(doc.data());
    });
    return comments;
  }

  async getComment(commentId: number): Promise<CommentsDocument> {
    this.logger.log(`Getting comment with ID: ${commentId}`);
    const docRef = this.commentsCollection.doc(commentId.toString());
    const commentDoc = await docRef.get();
    const comment = commentDoc.data();
    return comment;
  }

  async deleteComment(commentId: number): Promise<void> {
    this.logger.log(`Deleting comment with ID: ${commentId}`);
    const docRef = this.commentsCollection.doc(commentId.toString());
    await docRef.delete();
  }

  async updateComment(
    commentId: number,
    comment: Comment,
  ): Promise<CommentsDocument> {
    this.logger.log(`Updating comment with ID: ${commentId}`);
    const docRef = this.commentsCollection.doc(commentId.toString());
    await docRef.update(comment);
    const commentDoc = await docRef.get();
    const updatedComment = commentDoc.data();
    return updatedComment;
  }

  async getPostComments(postId: number): Promise<CommentsDocument[]> {
    this.logger.log(`Getting comments for post with ID: ${postId}`);
    const snapshot = await this.commentsCollection
      .where('postId', '==', Number(postId))
      .get();
    const comments: CommentsDocument[] = [];
    snapshot.forEach((doc) => {
      this.logger.debug(`Found comment: ${doc.id}`);
      comments.push(doc.data());
    });
    return comments;
  }
}
