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
    let error: HTTPError | null;
    console.log(this.config.get('STOCK_API_KEY'));
    try {
      const { data } = await axios.get(
        `http://ecos.bok.or.kr/api/StatisticSearch/${this.config.get(
          'STOCK_API_KEY',
        )}/json/kr/1/50000/064Y001/DD/20040101/20201231/0001000`,
      );

      // if(data.inc)
      const {
        data: {
          StatisticSearch: { row },
        },
      }: {
        data: { StatisticSearch: { row: ResponseDto[] } };
      } = await axios.get(
        `http://ecos.bok.or.kr/api/StatisticSearch/${this.config.get(
          'STOCK_API_KEY',
        )}/json/kr/1/50000/064Y001/DD/20040101/20201231/0001000`,
      );

      result = row.map((data) => ({
        value: data.DATA_VALUE,
        time: data.TIME,
      }));
    } catch (e) {
      error = new HTTPError(e.statusCode, e.message);
    }

    return { result, error };
  }

  async fetchKosdaq() {
    let result: { value: string; time: string }[];
    let error: HTTPError | null;

    try {
      const {
        data: {
          StatisticSearch: { row },
        },
      }: {
        data: { StatisticSearch: { row: ResponseDto[] } };
      } = await axios.get(
        `http://ecos.bok.or.kr/api/StatisticSearch/${this.config.get(
          'STOCK_API_KEY',
        )}/json/kr/1/50000/064Y001/DD/20040101/20201231/0089000`,
      );

      result = row.map((data) => ({
        value: data.DATA_VALUE,
        time: data.TIME,
      }));
    } catch (e) {
      error = new HTTPError(e.statusCode, e.message);
    }

    return { result, error };
  }
}
