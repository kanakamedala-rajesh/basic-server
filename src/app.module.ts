import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';

import { FirestoreModule } from './firestore/firestore.module';

import { AlbumsModule } from './albums/albums.module';
import { PostsModule } from './posts/posts.module';
import { UserModule } from './users/users.module';

import { AlbumsService } from './albums/albums.service';
import { PostsService } from './posts/posts.service';
import { UsersService } from './users/users.service';

@Module({
  controllers: [AppController],
  imports: [
    UserModule,
    PostsModule,
    AlbumsModule,

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
  providers: [UsersService, PostsService, AlbumsService],
})
export class AppModule {}
