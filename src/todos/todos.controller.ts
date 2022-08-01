import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import TODOS from '../data/todos.data';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Post('/init')
  init() {
    return this.todosService.initializeTodos(TODOS);
  }

  @Get()
  getUserTodos(@Query() query: { userId: number }) {
    if (query.userId) {
      return this.todosService.getUserTodos(query.userId);
    } else {
      return this.todosService.getTodos();
    }
  }

  @Get('/:todoId')
  getTodo(@Param() params: { todoId: number }) {
    return this.todosService.getTodo(params.todoId);
  }

  @Delete('/:todoId')
  deleteTodo(@Param() params: { todoId: number }) {
    return this.todosService.deleteTodo(params.todoId);
  }

  @Post()
  createTodo(@Req() req: Request) {
    return this.todosService.create(req.body);
  }

  @Patch('/:todoId')
  updateTodo(@Req() req: Request, @Param() params: { todoId: number }) {
    return this.todosService.updateTodo(params.todoId, req.body);
  }
}
