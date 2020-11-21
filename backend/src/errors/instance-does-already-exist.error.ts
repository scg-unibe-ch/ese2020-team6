import { Model } from 'sequelize';
import { ModelName } from './instance-does-not-exist.error';

export class InstanceDoesAlreadyExistError extends Error {

  constructor(modelName: string | ModelName) {
    super('Instance in table \'' + modelName + '\' with the specified attributes does already exist!');
    Object.setPrototypeOf(this, InstanceDoesAlreadyExistError.prototype);
  }

  private static getTableName(modelName: string | ModelName): string {
    if (typeof modelName === 'string') {
      return modelName as string;
    } else {
      return (modelName as ModelName).tableName;
    }
  }
}
