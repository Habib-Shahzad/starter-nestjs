import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Get()
  getHello(): any {
    return this.databaseService.getRecords();
    return this.appService.getHello();
  }

  @Get('/create')
  createRecord(): any {
    return this.databaseService.createRecord('test');
  }
}
