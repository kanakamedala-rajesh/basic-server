import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import PHOTOS from 'src/data/photos.data';
import { PhotosService } from './photos.service';

@Controller('photos')
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  @Post('/init')
  init() {
    return this.photosService.initializePhotos(PHOTOS);
  }

  @Get()
  getUserPhotos(@Query() query: { albumId: number }) {
    if (query.albumId) {
      return this.photosService.getAlbumPhotos(query.albumId);
    } else {
      return this.photosService.getPhotos();
    }
  }

  @Get('/:photoId')
  getPhoto(@Param() params: { photoId: number }) {
    return this.photosService.getPhoto(params.photoId);
  }

  @Delete('/:photoId')
  deletePhoto(@Param() params: { photoId: number }) {
    return this.photosService.deletePhoto(params.photoId);
  }

  @Post()
  createPhoto(@Req() req: Request) {
    return this.photosService.create(req.body);
  }

  @Patch('/:photoId')
  updatePhoto(@Req() req: Request, @Param() params: { photoId: number }) {
    return this.photosService.updatePhoto(params.photoId, req.body);
  }
}
