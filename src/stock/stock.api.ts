import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ResponseDto } from './stock.dto';
import { HTTPError } from '../lib/HTTPError';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StockAPI {
  constructor(private readonly config: ConfigService) {}
  async fetchKospi() {
    let result: { value: string; time: string }[];
    let error: HTTPError;

    const { data } = await axios.get(
      `http://ecos.bok.or.kr/api/StatisticSearch/${this.config.get(
        'STOCK_API_KEY',
      )}/json/kr/1/50000/064Y001/DD/20040101/20201231/0001000`,
    );

    if (typeof data === 'string' && data.includes('인증')) {
      error = new HTTPError(403, 'api key error');
    } else {
      const row: ResponseDto[] = data.StatisticSearch.row;

      result = row.map((data) => ({
        value: data.DATA_VALUE,
        time: data.TIME,
      }));
    }

    return { result, error };
  }

  async fetchKosdaq() {
    let result: { value: string; time: string }[];
    let error: HTTPError | null;

    const { data } = await axios.get(
      `http://ecos.bok.or.kr/api/StatisticSearch/${this.config.get(
        'STOCK_API_KEY',
      )}/json/kr/1/50000/064Y001/DD/20040101/20201231/0089000`,
    );

    if (typeof data === 'string' && data.includes('인증')) {
      error = new HTTPError(403, 'api key error');
    } else {
      const row: ResponseDto[] = data.StatisticSearch.row;

      result = row.map((data) => ({
        value: data.DATA_VALUE,
        time: data.TIME,
      }));
    }

    return { result, error };
  }
}
