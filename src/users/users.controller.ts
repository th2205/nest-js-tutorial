import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserCreateType } from './users.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}
  @Get()
  findAll(): Promise<User[]> {
    return this.service.findAll();
  }

  @Post()
  create(@Body() user: User): string {
    console.log('sdsd', user);
    const result = this.service.createUser(user);
    console.log(result);
    return '1';
  }
}
