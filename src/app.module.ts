import { Module } from '@nestjs/common';
import { UsersModule } from './stock/stock.module';

@Module({
  imports: [UsersModule],
})
export class AppModule {}
