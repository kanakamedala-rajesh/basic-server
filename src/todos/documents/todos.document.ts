import { Todo } from 'src/entities/Todo.entity';

export class TodosDocument extends Todo {
  static collectionName = 'todos';
}
