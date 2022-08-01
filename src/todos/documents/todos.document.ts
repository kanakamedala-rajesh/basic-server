import { Todo } from '../../entities/Todo.entity';

export class TodosDocument extends Todo {
  static collectionName = 'todos';
}
