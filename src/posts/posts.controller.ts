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
import POSTS from '../data/posts.data';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post('/init')
  init() {
    return this.postsService.initializePosts(POSTS);
  }

  @Get()
  getUserPosts(@Query() query: { userId: number }) {
    if (query.userId) {
      return this.postsService.getUserPosts(query.userId);
    } else {
      return this.postsService.getPosts();
    }
  }

  @Get('/:postId')
  getPost(@Param() params: { postId: number }) {
    return this.postsService.getPost(params.postId);
  }

  @Delete('/:postId')
  deletePost(@Param() params: { postId: number }) {
    return this.postsService.deletePost(params.postId);
  }

  @Post()
  createPost(@Req() req: Request) {
    return this.postsService.create(req.body);
  }

  @Patch('/:postId')
  updatePost(@Req() req: Request, @Param() params: { postId: number }) {
    return this.postsService.updatePost(params.postId, req.body);
  }
}
