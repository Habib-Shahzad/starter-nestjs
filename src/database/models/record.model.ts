import { Item } from 'dynamoose/dist/Item';
import { ModelType } from 'dynamoose/dist/General';
import { model, Schema } from 'dynamoose';
import { v4 as uuid } from 'uuid';

export const RecordModelSchema = {
  pk: {
    type: 'String',
    default: uuid,
    hashKey: true,
  },
  sk: {
    type: 'String',
    default: uuid,
  },
  name: 'String',
};

export class RecordDbModel extends Item {
  id: string;
  name: string;

  static getModel(tableName: string): ModelType<RecordDbModel> {
    const schema = new Schema(RecordModelSchema, {
      timestamps: true,
    });
    return model<RecordDbModel>(tableName, schema, {
      create: false,
      waitForActive: false,
    });
  }
}
