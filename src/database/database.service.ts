import { Injectable } from '@nestjs/common';
import { RecordDbModel } from './models/record.model';
import { ModelType } from 'dynamoose/dist/General';
import * as dynamoose from 'dynamoose';

@Injectable()
export class DatabaseService {
  private readonly recordTable: ModelType<RecordDbModel>;

  private static configDB() {
    const ddb = new dynamoose.aws.ddb.DynamoDB({
      region: 'us-west-2',
    });
    dynamoose.aws.ddb.set(ddb);
  }

  constructor() {
    DatabaseService.configDB();
    this.recordTable = RecordDbModel.getModel('faithful-sealCyclicDB');
  }

  async createRecord(name: string): Promise<RecordDbModel> {
    const record = new this.recordTable({ name });
    await record.save();
    return record;
  }

  async getRecords(): Promise<RecordDbModel[]> {
    return await this.recordTable.scan().exec();
  }
}
