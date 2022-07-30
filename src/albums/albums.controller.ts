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
import POSTS from 'src/data/posts.data';
import { AlbumsService } from './albums.service';

@Controller('albums')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Post('/init')
  init() {
    return this.albumsService.initializeAlbums(POSTS);
  }

  @Get()
  getAlbums() {
    return this.albumsService.getAlbums();
  }

  @Get('/:albumId')
  getAlbum(@Param() params: { albumId: number }) {
    return this.albumsService.getAlbum(params.albumId);
  }

  @Get()
  getUserAlbums(@Query() query: { userId: number }) {
    return this.albumsService.getUserAlbums(query.userId);
  }

  @Delete('/:albumId')
  deleteAlbum(@Param() params: { albumId: number }) {
    return this.albumsService.deleteAlbum(params.albumId);
  }

  @Post()
  createAlbum(@Req() req: Request) {
    return this.albumsService.create(req.body);
  }

  @Patch('/:albumId')
  updateAlbum(@Req() req: Request, @Param() params: { albumId: number }) {
    return this.albumsService.updateAlbum(params.albumId, req.body);
  }
}
