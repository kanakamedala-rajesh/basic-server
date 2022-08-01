import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PostsService } from '../src/posts/posts.service';
import { PostsController } from '../src/posts/posts.controller';

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
