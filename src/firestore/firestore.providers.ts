import { AlbumsDocument } from 'src/albums/documents/albums.document';

import { PostsDocument } from 'src/posts/documents/posts.document';
import { UsersDocument } from 'src/users/documents/users.document';

export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions';
export const FirestoreCollectionProviders: string[] = [
  UsersDocument.collectionName,
  PostsDocument.collectionName,
  AlbumsDocument.collectionName,
];
