import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('api/dogs')
  async saveDogs(@Body('page') pageNumber: number) {
    return await this.appService.saveDogs(pageNumber);
  }

  @Get('api/dogs')
  async getDogs() {
    return await this.appService.getDogs();
  }
}
