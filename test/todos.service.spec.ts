import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { TodosService } from '../src/todos/todos.service';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService],
      imports: [AppModule],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
