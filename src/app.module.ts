import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';

import { FirestoreModule } from './firestore/firestore.module';

import { AlbumsModule } from './albums/albums.module';
import { CommentsModule } from './comments/comments.module';
import { PhotosModule } from './photos/photos.module';
import { PostsModule } from './posts/posts.module';
import { TodosModule } from './todos/todos.module';
import { UserModule } from './users/users.module';

@Module({
  controllers: [AppController],
  imports: [
    UserModule,
    PostsModule,
    AlbumsModule,
    CommentsModule,
    TodosModule,
    PhotosModule,

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirestoreModule.forRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        keyFilename: configService.get<string>('SA_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
