import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(query: object): object {
    return query;
  }
}
