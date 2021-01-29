import { Controller, Get, HttpException } from '@nestjs/common';
import { StockAPI } from './stock.api';

@Controller('stock')
export class StockController {
  constructor(private stockAPI: StockAPI) {}
  @Get('kospi')
  async getKospi() {
    const { result, error } = await this.stockAPI.fetchKospi();

    if (error) {
      throw new HttpException(
        {
          status: error.getStatusCode(),
          error: error.getMessage(),
        },
        error.getStatusCode(),
      );
    }

    return result;
  }

  @Get('kosdaq')
  async getKosdaq() {
    const { result, error } = await this.stockAPI.fetchKosdaq();

    if (error) {
      throw new HttpException(
        {
          status: error.getStatusCode(),
          error: error.getMessage(),
        },
        error.getStatusCode(),
      );
    }

    return result;
  }
}
