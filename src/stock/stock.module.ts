import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockAPI } from './stock.api';

@Module({
  providers: [StockAPI],
  controllers: [StockController],
})
export class UsersModule {}
