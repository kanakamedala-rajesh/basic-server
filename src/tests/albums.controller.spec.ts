import { Test, TestingModule } from '@nestjs/testing';
import { AlbumsController } from '../albums/albums.controller';
import { AlbumsService } from '../albums/albums.service';
import { AppModule } from '../app.module';

describe('AlbumsController', () => {
  let controller: AlbumsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlbumsService],
      imports: [AppModule],
    }).compile();

    controller = module.get<AlbumsController>(AlbumsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
