import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { PostsService } from '../posts/posts.service';
import { PostsController } from '../posts/posts.controller';

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService],
      imports: [AppModule],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
