import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  intro() {
    return {
      message: 'Welcome to Bookie API',
      documentation: '/docs',
    };
  }
}
