import { Photo } from '../../entities/Photo.entity';

export class PhotosDocument extends Photo {
  static collectionName = 'photos';
}
