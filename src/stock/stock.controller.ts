import { Controller, Get } from '@nestjs/common';
import { ResponseDto } from './stock.dto';
import axios from 'axios';

@Controller('stock')
export class StockController {
  @Get('kospi')
  async getKospi() {
    const {
      data: {
        StatisticSearch: { row },
      },
    }: { data: { StatisticSearch: { row: ResponseDto[] } } } = await axios.get(
      'http://ecos.bok.or.kr/api/StatisticSearch/7QMQRH93AK98G0IWSN0F/json/kr/1/50000/064Y001/DD/20040101/20201231/0001000',
    );

    const result = row.map((data) => ({
      value: data.DATA_VALUE,
      time: data.TIME,
    }));

    return result;
  }

  @Get('kosdaq')
  async getKosdaq() {
    const {
      data: {
        StatisticSearch: { row },
      },
    }: { data: { StatisticSearch: { row: ResponseDto[] } } } = await axios.get(
      'http://ecos.bok.or.kr/api/StatisticSearch/7QMQRH93AK98G0IWSN0F/json/kr/1/50000/064Y001/DD/20040101/20201231/0089000',
    );

    const result = row.map((data) => ({
      value: data.DATA_VALUE,
      time: data.TIME,
    }));

    return result;
  }
}
