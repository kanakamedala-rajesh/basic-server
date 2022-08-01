import { Photo } from 'src/entities/Photo.entity';

export class PhotosDocument extends Photo {
  static collectionName = 'photos';
}
