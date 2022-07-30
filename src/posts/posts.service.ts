import { Inject, Injectable, Logger } from '@nestjs/common';
import { CollectionReference } from 'firebase-admin/firestore';
import { Post } from 'src/entities/Post.entity';
import { PostsDocument } from './documents/posts.document';

@Injectable()
export class PostsService {
  private logger: Logger = new Logger(PostsService.name);

  constructor(
    @Inject(PostsDocument.collectionName)
    private postsCollection: CollectionReference<PostsDocument>,
  ) {}

  async initializePosts(posts: Post[]): Promise<PostsDocument[]> {
    const createdPosts: Post[] = [];
    for (const post of posts) {
      const createdDocument = await this.create(post);
      createdPosts.push(createdDocument);
    }
    return createdPosts;
  }

  async create(post: Post): Promise<PostsDocument> {
    this.logger.log(`Creating post: ${post.title}`);
    const docRef = this.postsCollection.doc(post.id.toString());
    await docRef.set(post);
    const todoDoc = await docRef.get();
    const todo = todoDoc.data();
    return todo;
  }

  async getPosts(): Promise<PostsDocument[]> {
    this.logger.log('Getting posts');
    const snapshot = await this.postsCollection.get();
    const posts: PostsDocument[] = [];
    snapshot.forEach((doc) => {
      this.logger.debug(`Found post: ${doc.id}`);
      posts.push(doc.data());
    });
    return posts;
  }

  async getPost(postId: number): Promise<PostsDocument> {
    this.logger.log(`Getting post with ID: ${postId}`);
    const docRef = this.postsCollection.doc(postId.toString());
    const postDoc = await docRef.get();
    const post = postDoc.data();
    return post;
  }

  async deletePost(postId: number): Promise<void> {
    this.logger.log(`Deleting post with ID: ${postId}`);
    const docRef = this.postsCollection.doc(postId.toString());
    await docRef.delete();
  }

  async updatePost(postId: number, post: Post): Promise<PostsDocument> {
    this.logger.log(`Updating post with ID: ${postId}`);
    const docRef = this.postsCollection.doc(postId.toString());
    await docRef.update(post);
    const postDoc = await docRef.get();
    const updatedPost = postDoc.data();
    return updatedPost;
  }

  async getUserPosts(userId: number): Promise<PostsDocument[]> {
    this.logger.log(`Getting posts for user with ID: ${userId}`);

    const posts: PostsDocument[] = [];

    try {
      const snapshot = await this.postsCollection
        .where('userId', '==', userId)
        .get();

      this.logger.log(snapshot.size);

      snapshot.forEach((doc) => {
        this.logger.debug(`Found post: ${doc.id}`);
        posts.push(doc.data());
      });
    } catch (error) {
      this.logger.error(error);
    }
    return posts;
  }
}
