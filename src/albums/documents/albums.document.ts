import { Album } from '../../entities/Album.entity';

export class AlbumsDocument extends Album {
  static collectionName = 'albums';
}
