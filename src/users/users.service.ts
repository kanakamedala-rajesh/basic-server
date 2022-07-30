import { Inject, Injectable, Logger } from '@nestjs/common';
import { CollectionReference } from 'firebase-admin/firestore';
import { User } from 'src/entities/User.entity';
import { UsersDocument } from './documents/users.document';

@Injectable()
export class UsersService {
  private logger: Logger = new Logger(UsersService.name);

  constructor(
    @Inject(UsersDocument.collectionName)
    private usersCollection: CollectionReference<UsersDocument>,
  ) {}

  async initializeUsers(users: User[]): Promise<UsersDocument[]> {
    const createdUsers: User[] = [];
    for (const user of users) {
      const createdDocument = await this.create(user);
      createdUsers.push(createdDocument);
    }
    return createdUsers;
  }

  async create(user: User): Promise<UsersDocument> {
    this.logger.log(`Creating user: ${user.name}`);
    const docRef = this.usersCollection.doc(user.id.toString());
    await docRef.set(user);
    const todoDoc = await docRef.get();
    const todo = todoDoc.data();
    return todo;
  }

  async getUsers(): Promise<UsersDocument[]> {
    this.logger.log('Getting users');
    const snapshot = await this.usersCollection.get();
    const users: UsersDocument[] = [];
    snapshot.forEach((doc) => {
      this.logger.debug(`Found user: ${doc.id}`);
      users.push(doc.data());
    });
    return users;
  }

  async getUser(userId: number): Promise<UsersDocument> {
    this.logger.log(`Getting user with ID: ${userId}`);
    const docRef = this.usersCollection.doc(userId.toString());
    const userDoc = await docRef.get();
    const user = userDoc.data();
    return user;
  }

  async deleteUser(userId: number): Promise<void> {
    this.logger.log(`Deleting user with ID: ${userId}`);
    const docRef = this.usersCollection.doc(userId.toString());
    await docRef.delete();
  }

  async updateUser(userId: number, user: User): Promise<UsersDocument> {
    this.logger.log(`Updating user with ID: ${userId}`);
    const docRef = this.usersCollection.doc(userId.toString());
    await docRef.update(user);
    const userDoc = await docRef.get();
    const updatedUser = userDoc.data();
    return updatedUser;
  }
}
