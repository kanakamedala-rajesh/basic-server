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
import COMMENTS from '../data/comments.data';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post('/init')
  init() {
    return this.commentsService.initializeComments(COMMENTS);
  }

  @Get()
  getUserComments(@Query() query: { postId: number }) {
    if (query.postId) {
      return this.commentsService.getPostComments(query.postId);
    } else {
      return this.commentsService.getComments();
    }
  }

  @Get('/:commentId')
  getComment(@Param() params: { commentId: number }) {
    return this.commentsService.getComment(params.commentId);
  }

  @Delete('/:commentId')
  deleteComment(@Param() params: { commentId: number }) {
    return this.commentsService.deleteComment(params.commentId);
  }

  @Post()
  createComment(@Req() req: Request) {
    return this.commentsService.create(req.body);
  }

  @Patch('/:commentId')
  updateComment(@Req() req: Request, @Param() params: { commentId: number }) {
    return this.commentsService.updateComment(params.commentId, req.body);
  }
}
