import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): object {
    return {
      application: 'Exbill API',
      version: '1.0.0',
      authors: ['Nicolas Miranda <nicxes@pm.me>', 'Pablo Carnelave'],
    };
  }
}
