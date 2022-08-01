import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import USERS from '../data/users.data';
import { UsersService } from './users.service';

@Controller('/users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Post('/init')
  init() {
    return this.usersService.initializeUsers(USERS);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('/:userId')
  getUser(@Param() params: { userId: number }) {
    return this.usersService.getUser(params.userId);
  }

  @Delete('/:userId')
  deleteUser(@Param() params: { userId: number }) {
    return this.usersService.deleteUser(params.userId);
  }

  @Post()
  createUser(@Req() req: Request) {
    this.usersService.create(req.body);
  }

  @Patch('/:userId')
  updateUser(@Req() req: Request, @Param() params: { userId: number }) {
    return this.usersService.updateUser(params.userId, req.body);
  }
}
