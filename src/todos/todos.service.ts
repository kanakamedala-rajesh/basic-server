import { Inject, Injectable, Logger } from '@nestjs/common';
import { CollectionReference } from 'firebase-admin/firestore';
import { Todo } from 'src/entities/Todo.entity';
import { TodosDocument } from './documents/todos.document';

@Injectable()
export class TodosService {
  private logger: Logger = new Logger(TodosService.name);

  constructor(
    @Inject(TodosDocument.collectionName)
    private todosCollection: CollectionReference<TodosDocument>,
  ) {}

  async initializeTodos(todos: Todo[]): Promise<TodosDocument[]> {
    this.logger.log(`Initializing Todos document with ${todos.length} todos`);

    const createdTodos: Todo[] = [];
    for (const todo of todos) {
      const createdDocument = await this.create(todo);
      createdTodos.push(createdDocument);
    }
    return createdTodos;
  }

  async create(todo: Todo): Promise<TodosDocument> {
    this.logger.log(`Creating todo: ${todo.title}`);
    const docRef = this.todosCollection.doc(todo.id.toString());
    await docRef.set(todo);
    const todoDoc = await docRef.get();
    const dbTODO = todoDoc.data();
    return dbTODO;
  }

  async getTodos(): Promise<TodosDocument[]> {
    this.logger.log('Getting todos');
    const snapshot = await this.todosCollection.get();
    const todos: TodosDocument[] = [];
    snapshot.forEach((doc) => {
      this.logger.debug(`Found todo: ${doc.id}`);
      todos.push(doc.data());
    });
    return todos;
  }

  async getTodo(todoId: number): Promise<TodosDocument> {
    this.logger.log(`Getting todo with ID: ${todoId}`);
    const docRef = this.todosCollection.doc(todoId.toString());
    const todoDoc = await docRef.get();
    const todo = todoDoc.data();
    return todo;
  }

  async deleteTodo(todoId: number): Promise<void> {
    this.logger.log(`Deleting todo with ID: ${todoId}`);
    const docRef = this.todosCollection.doc(todoId.toString());
    await docRef.delete();
  }

  async updateTodo(todoId: number, todo: Todo): Promise<TodosDocument> {
    this.logger.log(`Updating todo with ID: ${todoId}`);
    const docRef = this.todosCollection.doc(todoId.toString());
    await docRef.update(todo);
    const todoDoc = await docRef.get();
    const updatedTodo = todoDoc.data();
    return updatedTodo;
  }

  async getUserTodos(userId: number): Promise<TodosDocument[]> {
    this.logger.log(`Getting todos for user with ID: ${userId}`);
    const snapshot = await this.todosCollection
      .where('userId', '==', Number(userId))
      .get();
    const todos: TodosDocument[] = [];
    snapshot.forEach((doc) => {
      this.logger.debug(`Found todo: ${doc.id}`);
      todos.push(doc.data());
    });
    return todos;
  }
}
