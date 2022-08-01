import { Inject, Injectable, Logger } from '@nestjs/common';
import { CollectionReference } from 'firebase-admin/firestore';
import { Album } from 'src/entities/Album.entity';
import { AlbumsDocument } from './documents/albums.document';

@Injectable()
export class AlbumsService {
  private logger: Logger = new Logger(AlbumsService.name);

  constructor(
    @Inject(AlbumsDocument.collectionName)
    private albumsCollection: CollectionReference<AlbumsDocument>,
  ) {}

  async initializeAlbums(albums: Album[]): Promise<AlbumsDocument[]> {
    this.logger.log(
      `Initializing Albums document with ${albums.length} albums`,
    );

    const createdAlbums: Album[] = [];
    for (const album of albums) {
      const createdDocument = await this.create(album);
      createdAlbums.push(createdDocument);
    }
    return createdAlbums;
  }

  async create(album: Album): Promise<AlbumsDocument> {
    this.logger.log(`Creating album: ${album.title}`);
    const docRef = this.albumsCollection.doc(album.id.toString());
    await docRef.set(album);
    const todoDoc = await docRef.get();
    const todo = todoDoc.data();
    return todo;
  }

  async getAlbums(): Promise<AlbumsDocument[]> {
    this.logger.log('Getting albums');
    const snapshot = await this.albumsCollection.get();
    const albums: AlbumsDocument[] = [];
    snapshot.forEach((doc) => {
      this.logger.debug(`Found album: ${doc.id}`);
      albums.push(doc.data());
    });
    return albums;
  }

  async getAlbum(albumId: number): Promise<AlbumsDocument> {
    this.logger.log(`Getting album with ID: ${albumId}`);
    const docRef = this.albumsCollection.doc(albumId.toString());
    const albumDoc = await docRef.get();
    const album = albumDoc.data();
    return album;
  }

  async deleteAlbum(albumId: number): Promise<void> {
    this.logger.log(`Deleting album with ID: ${albumId}`);
    const docRef = this.albumsCollection.doc(albumId.toString());
    await docRef.delete();
  }

  async updateAlbum(albumId: number, album: Album): Promise<AlbumsDocument> {
    this.logger.log(`Updating album with ID: ${albumId}`);
    const docRef = this.albumsCollection.doc(albumId.toString());
    await docRef.update(album);
    const albumDoc = await docRef.get();
    const updatedAlbum = albumDoc.data();
    return updatedAlbum;
  }

  async getUserAlbums(userId: number): Promise<AlbumsDocument[]> {
    this.logger.log(`Getting albums for user with ID: ${userId}`);
    const snapshot = await this.albumsCollection
      .where('userId', '==', Number(userId))
      .get();
    const albums: AlbumsDocument[] = [];
    snapshot.forEach((doc) => {
      this.logger.debug(`Found album: ${doc.id}`);
      albums.push(doc.data());
    });
    return albums;
  }
}
