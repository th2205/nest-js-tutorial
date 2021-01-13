import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';

@Module({
  providers: [],
  controllers: [StockController],
})
export class UsersModule {}
