import { AlbumsDocument } from 'src/albums/documents/albums.document';
import { CommentsDocument } from 'src/comments/documents/comments.document';
import { PhotosDocument } from 'src/photos/documents/photos.document';
import { PostsDocument } from 'src/posts/documents/posts.document';
import { TodosDocument } from 'src/todos/documents/todos.document';
import { UsersDocument } from 'src/users/documents/users.document';

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
