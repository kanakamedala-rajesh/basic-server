import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from '../todos/todos.service';
import { TodosController } from '../todos/todos.controller';
import { AppModule } from '../app.module';

describe('TodosController', () => {
  let controller: TodosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService],
      imports: [AppModule],
    }).compile();

    controller = module.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
