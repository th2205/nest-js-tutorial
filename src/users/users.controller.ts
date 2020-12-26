import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll(): string {
    return 'This action returns all catsss';
  }

  @Get('/1')
  findAll2(): string {
    return '1';
  }
}
