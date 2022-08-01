import { Inject, Injectable, Logger } from '@nestjs/common';
import { CollectionReference } from 'firebase-admin/firestore';
import { Photo } from 'src/entities/Photo.entity';
import { PhotosDocument } from './documents/photos.document';

@Injectable()
export class PhotosService {
  private logger: Logger = new Logger(PhotosService.name);

  constructor(
    @Inject(PhotosDocument.collectionName)
    private photosCollection: CollectionReference<PhotosDocument>,
  ) {}

  async initializePhotos(photos: Photo[]): Promise<PhotosDocument[]> {
    this.logger.log(
      `Initializing Photos document with ${photos.length} photos`,
    );

    const createdPhotos: Photo[] = [];
    for (const photo of photos) {
      const createdDocument = await this.create(photo);
      createdPhotos.push(createdDocument);
    }
    return createdPhotos;
  }

  async create(photo: Photo): Promise<PhotosDocument> {
    this.logger.log(`Creating photo: ${photo.title}`);
    const docRef = this.photosCollection.doc(photo.id.toString());
    await docRef.set(photo);
    const photoDoc = await docRef.get();
    const dbPhoto = photoDoc.data();
    return dbPhoto;
  }

  async getPhotos(): Promise<PhotosDocument[]> {
    this.logger.log('Getting photos');
    const snapshot = await this.photosCollection.get();
    const photos: PhotosDocument[] = [];
    snapshot.forEach((doc) => {
      this.logger.debug(`Found photo: ${doc.id}`);
      photos.push(doc.data());
    });
    return photos;
  }

  async getPhoto(photoId: number): Promise<PhotosDocument> {
    this.logger.log(`Getting photo with ID: ${photoId}`);
    const docRef = this.photosCollection.doc(photoId.toString());
    const photoDoc = await docRef.get();
    const photo = photoDoc.data();
    return photo;
  }

  async deletePhoto(photoId: number): Promise<void> {
    this.logger.log(`Deleting photo with ID: ${photoId}`);
    const docRef = this.photosCollection.doc(photoId.toString());
    await docRef.delete();
  }

  async updatePhoto(photoId: number, photo: Photo): Promise<PhotosDocument> {
    this.logger.log(`Updating photo with ID: ${photoId}`);
    const docRef = this.photosCollection.doc(photoId.toString());
    await docRef.update(photo);
    const photoDoc = await docRef.get();
    const updatedPhoto = photoDoc.data();
    return updatedPhoto;
  }

  async getAlbumPhotos(albumId: number): Promise<PhotosDocument[]> {
    this.logger.log(`Getting photos for album with ID: ${albumId}`);
    const snapshot = await this.photosCollection
      .where('albumId', '==', Number(albumId))
      .get();
    const photos: PhotosDocument[] = [];
    snapshot.forEach((doc) => {
      this.logger.debug(`Found photo: ${doc.id}`);
      photos.push(doc.data());
    });
    return photos;
  }
}
