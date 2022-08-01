import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from '../src/comments/comments.service';
import { AppModule } from '../src/app.module';
import { CommentsController } from '../src/comments/comments.controller';

describe('CommentsController', () => {
  let controller: CommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsService],
      imports: [AppModule],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
