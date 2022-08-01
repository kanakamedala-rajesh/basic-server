import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PhotosService } from '../src/photos/photos.service';

describe('PhotosService', () => {
  let service: PhotosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotosService],
      imports: [AppModule],
    }).compile();

    service = module.get<PhotosService>(PhotosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
