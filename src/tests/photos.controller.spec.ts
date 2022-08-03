import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { PhotosService } from '../photos/photos.service';
import { PhotosController } from '../photos/photos.controller';

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
