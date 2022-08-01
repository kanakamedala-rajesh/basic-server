import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PhotosService } from '../src/photos/photos.service';
import { PhotosController } from '../src/photos/photos.controller';

describe('PhotosController', () => {
  let controller: PhotosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PhotosService],
    }).compile();

    controller = module.get<PhotosController>(PhotosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
