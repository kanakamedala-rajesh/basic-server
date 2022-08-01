import { AlbumsDocument } from '../albums/documents/albums.document';
import { CommentsDocument } from '../comments/documents/comments.document';
import { PhotosDocument } from '../photos/documents/photos.document';
import { PostsDocument } from '../posts/documents/posts.document';
import { TodosDocument } from '../todos/documents/todos.document';
import { UsersDocument } from '../users/documents/users.document';

export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions';
export const FirestoreCollectionProviders: string[] = [
  UsersDocument.collectionName,
  PostsDocument.collectionName,
  AlbumsDocument.collectionName,
  CommentsDocument.collectionName,
  TodosDocument.collectionName,
  PhotosDocument.collectionName,
];
