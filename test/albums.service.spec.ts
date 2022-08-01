import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { AlbumsService } from '../src/albums/albums.service';

describe('AlbumsService', () => {
  let service: AlbumsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlbumsService],
      imports: [AppModule],
    }).compile();

    service = module.get<AlbumsService>(AlbumsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
